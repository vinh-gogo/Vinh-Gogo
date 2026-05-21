const eyeball = document.getElementById('eyeball');
const container = document.getElementById('hero-container');

// Biến lưu trữ vị trí mục tiêu (chuột) và vị trí hiện tại (dùng để LERP)
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

// Biến cho 3D tilt
let targetTiltX = 0, targetTiltY = 0;
let currentTiltX = 0, currentTiltY = 0;

document.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Giới hạn di chuyển của nhãn cầu
    const maxMoveX = 14;
    const maxMoveY = 8;

    // Tính toán tỷ lệ dựa trên kích thước màn hình
    targetX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX / 25));
    targetY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY / 25));

    // Tính toán góc nghiêng 3D cho Container
    targetTiltX = -(deltaY / 30); // Giới hạn góc nghiêng
    targetTiltY = (deltaX / 30);
});

// Vòng lặp Animation (Tạo độ mượt tự nhiên)
function animate() {
    // LERP (Linear Interpolation) - Di chuyển 10% khoảng cách mỗi frame
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    // Áp dụng di chuyển cho tròng mắt
    eyeball.style.transform = `translate(${currentX}px, ${currentY}px)`;

    // Áp dụng nghiêng 3D cho khung ngoài
    container.style.transform = `perspective(1000px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;

    requestAnimationFrame(animate);
}

// Khởi chạy vòng lặp
animate();
