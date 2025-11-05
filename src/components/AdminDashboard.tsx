import { useState, useEffect } from 'react';
import { Users, MessageCircle, Camera, Mail, Download, Trash2, CheckCircle, FileText } from 'lucide-react';
import { supabaseAdmin } from '../lib/supabase';
import type { RSVP, Wish, Photo, CantMakeIt } from '../lib/supabase';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'rsvps' | 'attending' | 'notattending' | 'wishes' | 'photos' | 'cantmake'>('rsvps');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [cantMakeIt, setCantMakeIt] = useState<CantMakeIt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  // READ operations: Fetch all data from database
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [rsvpsData, wishesData, photosData, cantMakeData] = await Promise.all([
        supabaseAdmin.from('rsvps').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('wishes').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('photos').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('cant_make_it').select('*').order('created_at', { ascending: false }),
      ]);

      if (!rsvpsData.error) setRsvps(rsvpsData.data || []);
      if (!wishesData.error) setWishes(wishesData.data || []);
      if (!photosData.error) setPhotos(photosData.data || []);
      if (!cantMakeData.error) setCantMakeIt(cantMakeData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE operation: Approve wish
  const approveWish = async (wishId: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('wishes')
        .update({ approved: true })
        .eq('id', wishId);

      if (error) throw error;

      setWishes(wishes.map(wish =>
        wish.id === wishId ? { ...wish, approved: true } : wish
      ));
    } catch (error) {
      console.error('Error approving wish:', error);
      alert('Failed to approve wish');
    }
  };

  // UPDATE operation: Approve photo
  const approvePhoto = async (photoId: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('photos')
        .update({ approved: true })
        .eq('id', photoId);

      if (error) throw error;

      setPhotos(photos.map(photo =>
        photo.id === photoId ? { ...photo, approved: true } : photo
      ));
    } catch (error) {
      console.error('Error approving photo:', error);
      alert('Failed to approve photo');
    }
  };

  // DELETE operation: Delete any record
  const deleteRecord = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      const { error } = await supabaseAdmin
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      switch (table) {
        case 'rsvps':
          setRsvps(rsvps.filter(r => r.id !== id));
          break;
        case 'wishes':
          setWishes(wishes.filter(w => w.id !== id));
          break;
        case 'photos':
          setPhotos(photos.filter(p => p.id !== id));
          break;
        case 'cant_make_it':
          setCantMakeIt(cantMakeIt.filter(c => c.id !== id));
          break;
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record');
    }
  };

  // Export RSVP data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPos = margin;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(27, 77, 137); // islamic-navy
    doc.text('Wedding RSVP Report', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Ahmed & Zainab - March 15, 2025', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Statistics
    const attending = rsvps.filter(r => r.will_attend);
    const notAttending = rsvps.filter(r => !r.will_attend);
    const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Summary Statistics:', margin, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.text(`Total RSVPs: ${rsvps.length}`, margin, yPos);
    yPos += 6;
    doc.text(`Attending: ${attending.length} (${totalGuests} total guests)`, margin, yPos);
    yPos += 6;
    doc.text(`Not Attending: ${notAttending.length}`, margin, yPos);
    yPos += 10;

    // Meal preferences
    const halal = attending.filter(r => r.meal_preference === 'halal').length;
    const vegetarian = attending.filter(r => r.meal_preference === 'vegetarian').length;
    const kids = attending.filter(r => r.meal_preference === 'kids').length;
    const special = attending.filter(r => r.meal_preference === 'special').length;

    doc.text('Meal Preferences:', margin, yPos);
    yPos += 6;
    doc.text(`Halal: ${halal} | Vegetarian: ${vegetarian} | Kids: ${kids} | Special: ${special}`, margin, yPos);
    yPos += 15;

    // RSVP List
    doc.setFontSize(14);
    doc.text('Attending Guests:', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    attending.forEach((rsvp, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = margin;
      }

      const line = `${index + 1}. ${rsvp.name} - ${rsvp.email} - ${rsvp.guest_count} guest(s) - ${rsvp.meal_preference}`;
      doc.text(line, margin, yPos);
      yPos += 6;
    });

    // Can't Make It section
    if (cantMakeIt.length > 0) {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = margin;
      } else {
        yPos += 10;
      }

      doc.setFontSize(14);
      doc.text('Unable to Attend:', margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      cantMakeIt.forEach((person, index) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = margin;
        }

        doc.text(`${index + 1}. ${person.name} - ${person.email}`, margin, yPos);
        yPos += 6;
        if (person.message) {
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          const splitMessage = doc.splitTextToSize(`   "${person.message}"`, pageWidth - 2 * margin);
          doc.text(splitMessage, margin, yPos);
          yPos += splitMessage.length * 4;
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
        }
      });
    }

    doc.save('wedding-rsvp-report.pdf');
  };

  // Statistics
  const attendingCount = rsvps.filter(r => r.will_attend).length;
  const notAttendingCount = rsvps.filter(r => !r.will_attend).length;
  const totalGuests = rsvps.filter(r => r.will_attend).reduce((sum, r) => sum + r.guest_count, 0);
  const approvedWishes = wishes.filter(w => w.approved).length;
  const pendingWishes = wishes.filter(w => !w.approved).length;
  const approvedPhotos = photos.filter(p => p.approved).length;
  const pendingPhotos = photos.filter(p => !p.approved).length;

  if (isLoading) {
    return (
      <section id="admin" className="py-20 bg-islamic-cream/30 min-h-screen">
        <div className="container mx-auto px-4">
          <p className="text-center font-english text-islamic-navy">Loading dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-20 bg-islamic-cream/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-arabic font-bold text-islamic-navy mb-4 text-center">
            Admin Dashboard
          </h2>
          <p className="text-center font-english text-islamic-navy/70 mb-8">
            Manage RSVPs, wishes, photos, and messages
          </p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="mx-auto mb-2 text-islamic-gold" size={32} />
              <p className="text-3xl font-bold text-islamic-navy">{attendingCount}</p>
              <p className="text-sm font-english text-islamic-navy/70">Attending</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="mx-auto mb-2 text-islamic-burgundy" size={32} />
              <p className="text-3xl font-bold text-islamic-navy">{totalGuests}</p>
              <p className="text-sm font-english text-islamic-navy/70">Total Guests</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MessageCircle className="mx-auto mb-2 text-islamic-teal" size={32} />
              <p className="text-3xl font-bold text-islamic-navy">{wishes.length}</p>
              <p className="text-sm font-english text-islamic-navy/70">Wishes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Camera className="mx-auto mb-2 text-islamic-emerald" size={32} />
              <p className="text-3xl font-bold text-islamic-navy">{photos.length}</p>
              <p className="text-sm font-english text-islamic-navy/70">Photos</p>
            </div>
          </div>

          {/* Export Button */}
          <div className="text-center mb-8">
            <button
              onClick={exportToPDF}
              className="px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              <FileText size={20} />
              Export RSVP Report (PDF)
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-wrap border-b border-islamic-gold/20">
            <button
              onClick={() => setActiveTab('rsvps')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'rsvps'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              All RSVPs ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveTab('attending')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'attending'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              Attending ({attendingCount})
            </button>
            <button
              onClick={() => setActiveTab('notattending')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'notattending'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              Not Attending ({notAttendingCount})
            </button>
            <button
              onClick={() => setActiveTab('wishes')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'wishes'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              Wishes ({pendingWishes} pending)
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'photos'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              Photos ({pendingPhotos} pending)
            </button>
            <button
              onClick={() => setActiveTab('cantmake')}
              className={`px-6 py-4 font-english font-semibold transition-colors ${
                activeTab === 'cantmake'
                  ? 'bg-islamic-gold text-white'
                  : 'text-islamic-navy hover:bg-islamic-cream/50'
              }`}
            >
              Can't Attend ({cantMakeIt.length})
            </button>
          </div>

          <div className="p-6">
            {/* RSVPs Tab */}
            {(activeTab === 'rsvps' || activeTab === 'attending' || activeTab === 'notattending') && (
              <div className="overflow-x-auto">
                <table className="w-full font-english">
                  <thead>
                    <tr className="border-b border-islamic-gold/20">
                      <th className="text-left py-3 px-2 text-islamic-navy">Name</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Email</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Phone</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Guests</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Meal</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Status</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Date</th>
                      <th className="text-left py-3 px-2 text-islamic-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps
                      .filter(rsvp => {
                        if (activeTab === 'attending') return rsvp.will_attend;
                        if (activeTab === 'notattending') return !rsvp.will_attend;
                        return true;
                      })
                      .map(rsvp => (
                        <tr key={rsvp.id} className="border-b border-islamic-gold/10 hover:bg-islamic-cream/20">
                          <td className="py-3 px-2 text-islamic-navy">{rsvp.name}</td>
                          <td className="py-3 px-2 text-islamic-navy text-sm">{rsvp.email}</td>
                          <td className="py-3 px-2 text-islamic-navy text-sm">{rsvp.phone || '-'}</td>
                          <td className="py-3 px-2 text-islamic-navy">{rsvp.guest_count}</td>
                          <td className="py-3 px-2 text-islamic-navy text-sm capitalize">{rsvp.meal_preference}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              rsvp.will_attend
                                ? 'bg-islamic-emerald/20 text-islamic-emerald'
                                : 'bg-islamic-burgundy/20 text-islamic-burgundy'
                            }`}>
                              {rsvp.will_attend ? 'Attending' : 'Not Attending'}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-islamic-navy text-sm">
                            {format(new Date(rsvp.created_at), 'MMM dd, yyyy')}
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => deleteRecord('rsvps', rsvp.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Wishes Tab */}
            {activeTab === 'wishes' && (
              <div className="space-y-4">
                {wishes.map(wish => (
                  <div
                    key={wish.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      wish.approved ? 'bg-islamic-emerald/10 border-islamic-emerald' : 'bg-islamic-gold/10 border-islamic-gold'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-english font-semibold text-islamic-navy">{wish.name}</h4>
                        <p className="text-xs text-islamic-navy/50 font-english">
                          {format(new Date(wish.created_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!wish.approved && (
                          <button
                            onClick={() => approveWish(wish.id)}
                            className="px-3 py-1 bg-islamic-emerald text-white rounded hover:opacity-80 flex items-center gap-1 text-sm"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteRecord('wishes', wish.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:opacity-80 flex items-center gap-1 text-sm"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="font-english text-islamic-navy/80">"{wish.message}"</p>
                    {wish.approved && (
                      <p className="text-xs text-islamic-emerald font-english mt-2">✓ Approved</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map(photo => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.filename}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-between p-3">
                      <div className="text-white text-xs font-english">
                        <p className="font-semibold">By: {photo.uploaded_by || 'Anonymous'}</p>
                        <p>{format(new Date(photo.created_at), 'MMM dd, yyyy')}</p>
                      </div>
                      <div className="flex gap-2">
                        {!photo.approved && (
                          <button
                            onClick={() => approvePhoto(photo.id)}
                            className="flex-1 px-2 py-1 bg-islamic-emerald text-white rounded text-xs hover:opacity-80"
                          >
                            <CheckCircle size={14} className="inline mr-1" />
                            Approve
                          </button>
                        )}
                        <a
                          href={photo.url}
                          download
                          className="flex-1 px-2 py-1 bg-islamic-gold text-white rounded text-xs hover:opacity-80 text-center"
                        >
                          <Download size={14} className="inline mr-1" />
                          Download
                        </a>
                        <button
                          onClick={() => deleteRecord('photos', photo.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:opacity-80"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      {photo.approved && (
                        <p className="text-xs text-islamic-emerald font-english">✓ Approved</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Can't Make It Tab */}
            {activeTab === 'cantmake' && (
              <div className="space-y-4">
                {cantMakeIt.map(person => (
                  <div key={person.id} className="p-4 bg-islamic-burgundy/10 rounded-lg border-l-4 border-islamic-burgundy">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-english font-semibold text-islamic-navy">{person.name}</h4>
                        <p className="text-sm text-islamic-navy/70 font-english">{person.email}</p>
                        <p className="text-xs text-islamic-navy/50 font-english">
                          {format(new Date(person.created_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteRecord('cant_make_it', person.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    {person.message && (
                      <p className="font-english text-islamic-navy/80 mt-2">"{person.message}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
