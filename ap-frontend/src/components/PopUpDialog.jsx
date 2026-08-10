function PopUpDialog({ isOpen, title = 'Message', message, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded border border-ap-brown bg-ap-pale p-5 text-center text-ap-brown shadow-2xl transition duration-300 md:max-w-md md:p-6 lg:max-w-lg lg:p-7">
        <p className="text-xs uppercase tracking-[0.3em] md:text-sm">
          Atelier Pascale
        </p>

        <h2 className="mt-3 text-2xl font-light md:text-3xl lg:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded border border-ap-brown bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-pale hover:text-ap-brown active:translate-y-0 md:mt-7 md:px-6 md:text-sm lg:mt-8 lg:px-7 lg:py-4"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default PopUpDialog
