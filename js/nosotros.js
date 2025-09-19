// Animación de elementos al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated-element');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar al cargar y al hacer scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Efecto parallax suave para algunas secciones
    const compromisoSection = document.querySelector('.compromiso-section');
    const productosSection = document.querySelector('.productos-destacados');
    
    if (compromisoSection && productosSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            // Efecto parallax para la sección de compromiso
            compromisoSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            
            // Efecto parallax para la sección de productos
            productosSection.style.backgroundPositionY = scrollPosition * 0.3 + 'px';
        });
    }
    
    // Animación para los tags de productos
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});