document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("contactForm");
    const modal = document.getElementById("modalConfirmacion");
    const closeBtn = document.querySelector(".close-button");
    const homeBtn = document.querySelector(".modal-button");

    if (formulario) {
        formulario.addEventListener("submit", async (e) => {
            e.preventDefault(); // Evita el envío predeterminado del formulario

            const formData = new FormData(formulario);
            const data = {
                nombre: formData.get("name"),
                email: formData.get("email"),
                asunto: formData.get("subject"),
                mensaje: formData.get("message"),
            };

            try {
                const response = await fetch("http://localhost:3000/api/contactanos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                if (result.success) {
                    alert("Mensaje enviado correctamente.");
                    formulario.reset();
                } else {
                    alert("Error al enviar el mensaje: " + result.error);
                }
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
                alert("Ocurrió un error al enviar el mensaje.");
            }

            // Mostrar el modal
            modal.style.display = "block";
        });
    } else {
        console.error("Formulario con ID 'contactForm' no encontrado.");
    }
    
    // Cerrar el modal al hacer clic en el botón de cerrar
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Cerrar el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});