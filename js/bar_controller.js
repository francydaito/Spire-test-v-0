
document.addEventListener('DOMContentLoaded', function() {

    const bar = document.getElementById('filter_bar');

    const initialTop = -170;
    const minY = initialTop;
    const maxY = initialTop + 170;

    let isMouseDown = false;
    let isDraggingUp = false;

    bar.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        
        const startY = e.clientY;
        const initialTop = bar.offsetTop;

        document.addEventListener('mousemove', handleDrag);

        document.addEventListener('mouseup', function () {
            isMouseDown = false;
            document.removeEventListener('mousemove', handleDrag);

            // If the drag was upwards, continue moving upwards until reaching the limit position
            if (isDraggingUp) {
                bar.style.transition = 'top 0.5s ease-in-out';
                bar.style.top = minY + 'px';
            }
            // If the drag was downwards, continue moving downwards until reaching the limit position
            else {
                bar.style.transition = 'top 0.5s ease-in-out';
                bar.style.top = maxY + 'px';
            }
            setTimeout(() => {
                bar.style.transition = '';
            }, 500);
        });

        function handleDrag(e) {
            if (isMouseDown) {
                const deltaY = e.clientY - startY;
                const newTop = initialTop + deltaY;

                // Checking the direction of the drag
                isDraggingUp = deltaY < 0;

                // Limits the dragging based on maximum and minimum positions
                if (newTop >= minY && newTop <= maxY) {
                    bar.style.top = newTop + 'px';
                }
            }
        }
    });
});



