const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Tu Pedido</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement ("h1")
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    
    modalHeader.append(modalButton);

    carrito.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <p>Cantidad: ${product.cantidad}</p>
        <p>Total: ${product.cantidad * product.precio}</p>
    `;

    modalContainer.append(carritoContent);
    saveLocal();

    let eliminar = document.createElement("button")
    
    eliminar.innerText = "❌"
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto)
});

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total: ${total} $`;
    modalContainer.append(totalCompra);
    
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element)=> element.id);
    
    Toastify({
        text: "Producto Eliminado",
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
    
      carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;      
 });

 pintarCarrito();
 saveLocal();
};