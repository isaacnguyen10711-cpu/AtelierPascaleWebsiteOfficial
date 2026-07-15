
function AdminAddProductPage() {
  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <section className="mx-auto max-w-3xl">
        

        <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
          Admin Add New Product
        </h1>
        <div>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium uppercase tracking-widest md:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3"
              />

            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium uppercase tracking-widest md:text-base">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-5"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium uppercase tracking-widest md:text-base">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium uppercase tracking-widest md:text-base">
                Category ID
              </label>
              <input
                type="number"
                name="categoryId"
                id="categoryId"
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-ap-brown text-ap-tan rounded-md px-4 py-2 hover:bg-ap-beige hover:text-white md:text-sm md:px-4 md:py-2 lg:text-base lg:px-5 lg:py-3"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AdminAddProductPage;