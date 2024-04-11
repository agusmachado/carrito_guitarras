// En Guitar.jsx

// Paso 01: Exportar por defecto la función del componente Guitar
export default function Guitar({guitar, addToCart}) {

    // Paso 02: Extraer las propiedades de la guitarra
    const { id, name, image, description, price } = guitar
   
    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    {/* Paso 03: Mostrar la imagen de la guitarra */}
                    <img className="img-fluid" src={`./public/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    {/* Paso 04: Mostrar el nombre de la guitarra */}
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    {/* Paso 05: Mostrar la descripción de la guitarra */}
                    <p>{description}</p>
                    {/* Paso 06: Mostrar el precio de la guitarra */}
                    <p className="fw-black text-primary fs-3">{price}</p>
                    {/* Paso 07: Agregar un botón para agregar la guitarra al carrito */}
                    <button 
                         
                        onClick={() => addToCart(guitar)}
                    >Agregar al Carrito</button>
                </div>
            </div>
    )
}
