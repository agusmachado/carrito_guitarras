export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}) {

    

// Cálculo del total del carrito      
const cartTotal = cart.reduce( ( total, { quantity, price } ) => total + ( quantity * price ), 0 )

    return (
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                <div id="carrito" className="bg-white p-3">

                  {/* 2 - Creo un ternario. En caso de que el carrito no tenga ningún elemento, entonces el carrito está vacío. Por el contrario, si el carrito tiene uno o más elementos, muestro los elementos y quito el cartel que dice que el carrito está vacío */}
                  {   cart.length === 0?
                  (<p className="text-center">El carrito está vacío</p>)                   
                  : 
                  (
                    /* 3 Creo un Fragment <></> para poder incluir el table y el Total a pagar en el mismo conjunto */
                <>
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {/* 1 - Destructuro las propiedades en los parámetros de la función de mapeo, de esta manera, hago más legible el código y evito anteponer guitar antes de cada propiedad. Evito colocar guitar.id, guitar.image, etc.. */}
                      {cart.map(({ id, image, name, price, quantity }) => (
                        <tr key={id}>
                          <td>
                            <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                          </td>
                          <td>{ name }</td>
                          <td className="fw-bold">${price}</td>
                          <td className="flex align-items-start gap-4">
                            <button 
                                type="button" 
                                className="btn btn-dark"
                                onClick={ () => decreaseQuantity(id)}
                            >
                                    -
                            </button>
                            {quantity}
                            <button     
                                type="button" 
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(id)}
                            >
                                    +
                            </button>
                          </td>
                          <td>
                            <button 
                                className="btn btn-danger" 
                                type="button"
                                onClick={() => removeFromCart(id)}
                                >X</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                 
                  <p className="text-end">Total pagar: <span className="fw-bold">${ cartTotal }</span></p>
                </>
                )}

                  <button 
                    className="btn btn-dark w-100 mt-3 p-2"
                    onClick={ clearCart }
                  >
                    Vaciar Carrito
                </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  

 