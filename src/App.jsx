// Paso 01: Importar el hook useState desde React
import { useEffect, useState } from "react";
import Guitar from "./components/Guitar"; // Importar el componente Guitar
import Header from "./components/Header"; // Importar el componente Header
import { db } from "./data/db"; // Importar la base de datos 'db'

function App() {

  const initialCart = () => {
    // Comprueba si hay un carrito en el almacenamiento local y lo devuelve, de lo contrario, devuelve un array vacío
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  // Paso 02: Definir el estado 'data' utilizando useState para acceder a los datos de la base de datos
  const data = db;

  // Paso 03: Definir el estado 'cart' utilizando useState para el carrito de compras
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1
  const MAX_ITEMS = 10

  useEffect(() => {
    // Almacena el carrito en el almacenamiento local cada vez que cambia
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Paso 04: Definir la función addToCart para agregar elementos al carrito
  function addToCart(item) {
    // Busca si el artículo ya existe en el carrito comparando sus IDs
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id );
  
    if (itemExists >= 0) { // Si el artículo ya está en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return; // Si la cantidad del artículo alcanza el límite máximo, no hace nada
      const updatedCart = [...cart]; // Crea una copia del carrito actual
      updatedCart[itemExists].quantity++; // Incrementa la cantidad del artículo existente en el carrito
      setCart(updatedCart); // Actualiza el carrito con la nueva cantidad
    } else { // Si el artículo no está en el carrito
      item.quantity = 1; // Establece la cantidad del artículo en 1
      setCart([...cart, item]); // Agrega el artículo al carrito
    }
  }
  
  // Elimina un artículo del carrito según su ID
  function removeFromCart(id) {
    // Utiliza setCart para actualizar el estado del carrito
    setCart(prevCart => 
      // Filtra el carrito anterior para eliminar el elemento con el ID proporcionado
      prevCart.filter(guitar => guitar.id !== id)
    );
  }

  // Disminuye la cantidad de un artículo en el carrito según su ID
  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) { // Verifica si el ID coincide y la cantidad es mayor que 1
        return {
          ...item, // Copia todas las propiedades del artículo
          quantity: item.quantity - 1 // Decrementa la cantidad del artículo en 1
        }
      }
      return item // Devuelve el artículo sin cambios si no cumple las condiciones
    })
    setCart(updatedCart) // Actualiza el carrito con el nuevo estado después de disminuir la cantidad
  }

  // Incrementa la cantidad de un artículo en el carrito según su ID
  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS ) { // Verifica si el ID coincide y la cantidad no excede 10
        return {
          ...item, // Copia todas las propiedades del artículo
          quantity: item.quantity + 1 // Incrementa la cantidad del artículo en 1
        }
      }
      return item // Devuelve el artículo sin cambios si no cumple las condiciones
    })
    setCart(updatedCart) // Actualiza el carrito con el nuevo estado después de incrementar la cantidad
  }

  // Vacía completamente el carrito
  function clearCart() {
    setCart([])
  }


  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}  
        clearCart={clearCart}      
      /> 
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => ( 
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            /> 
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;


