import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import PopUpDialog from "../components/PopUpDialog";

function AdminAddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");

  function handleClosePopUp() {
    setIsPopUpOpen(false);
  }

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const newProduct = {
      name,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
    };

    const response = await fetch("https://localhost:7215/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      setPopUpTitle("Error");
      setPopUpMessage("Failed to add product. Please try again.");
      setIsPopUpOpen(true);
      return;
    }

    setPopUpTitle("Success");
    setPopUpMessage(`${name} added successfully!`);
    setIsPopUpOpen(true);
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId("");
  }

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <PopUpDialog isOpen={isPopUpOpen} onClose={handleClosePopUp} title={popUpTitle} message={popUpMessage} />
      <section className="mx-auto max-w-3xl">
        

        <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
          Admin Add New Product
        </h1>
        <div>
          <form onSubmit={handleAddProduct} className="mt-4 space-y-4 rounded-md border border-ap-brown bg-ap-pale p-6 transition duration-300 hover:shadow-lg md:mt-5 md:space-y-4 md:p-8 lg:mt-6 lg:space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4 lg:text-base"
              />

            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-4 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-4 md:text-base lg:px-5 lg:py-5 lg:text-base"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4 lg:text-base"
              />
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Category ID
              </label>
              <input
                type="number"
                name="categoryId"
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)} 
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4 lg:text-base"
              />
            </div>
            <div>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-ap-brown px-4 py-2 text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-4 md:py-2 md:text-sm lg:px-5 lg:py-3 lg:text-base"
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


