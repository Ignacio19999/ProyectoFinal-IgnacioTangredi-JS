const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product)=> {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="price">${product.precio} $</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement("button")
        comprar.innerText = "Pedir";
        comprar.className = "comprar";
       
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
            
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        
        Toastify({
            text: "Agregado al pedido",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #fff, #ffbc0e)",
              color: "#000",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: ".75rem",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        
          if(repeat){
                carrito.map((prod) => {
                    if(prod.id === product.id){
                        prod.cantidad++;
                    }
                })
            }else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
                saveLocal();
            }
        });
    });
};

getProducts();

var swiper = new Swiper(".mySwiper",{
    effect:"coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 15,
        strech: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
    },
    loop:true,
});
//set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
//get item
JSON.parse(localStorage.getItem("carrito"));


