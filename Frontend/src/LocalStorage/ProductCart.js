let arr = [
  {
    productID: 1,
    productName: "Smartphone",
    // categoryID: 1,
    // brand: "Samsung",
    // description: "High-end smartphone with advanced features.",
    price: 699.99,
    quantity: 1,
    // weight: 0.5,
    // manufactureDate: "2023-01-15",
    // expiryDate: null,
    // averageRating: 4.5,
    // numRatings: 120,
  },
  {
    productID: 2,
    productName: "Laptop",
    // categoryID: 1,
    // brand: "HP",
    // description: "Powerful laptop for professional use.",
    price: 899.99,
    quantity: 2,
    // weight: 2.0,
    // manufactureDate: "2023-02-10",
    // expiryDate: null,
    // averageRating: 4.8,
    // numRatings: 80,
  },
  {
    productID: 3,
    productName: "Wireless Earbuds",
    // categoryID: 2,
    // brand: "Apple",
    // description: "High-quality wireless earbuds with noise cancellation.",
    price: 199.99,
    quantity: 1,
    // weight: 0.1,
    // manufactureDate: "2023-03-05",
    // expiryDate: null,
    // averageRating: 4.3,
    // numRatings: 150,
  },
];

const addToCardArray = (product) => {
  arr.push(product);
};

const getCardArray = () => {
  return arr;
};

export { addToCardArray, getCardArray };
