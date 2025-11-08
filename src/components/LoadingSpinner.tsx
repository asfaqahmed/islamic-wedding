export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-cream via-white to-islamic-gold/10">
      <div className="text-center">
        {/* Islamic Pattern Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-islamic-gold/30 border-t-islamic-gold rounded-full animate-spin"></div>

          {/* Inner rotating ring - opposite direction */}
          <div className="absolute inset-3 border-4 border-islamic-teal/30 border-b-islamic-teal rounded-full animate-spin-reverse"></div>

          {/* Center star/geometric pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-islamic-gold to-islamic-teal rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="font-arabic text-2xl text-islamic-navy mb-2 animate-pulse">
          جاري التحميل
        </p>
        <p className="font-english text-sm text-islamic-navy/70 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
