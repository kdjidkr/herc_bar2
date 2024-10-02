let menuItems = [
    { name: "홍합탕 (회장의 손맛)", price: 14900 },
    { name: "대패 산겹살", price: 15900 },
    { name: "불닭 단백질", price: 8900 },
    { name: "마른 안주(오징어쥐포마카로니)", price: 14900 },
    { name: "대아정", price: 9900 },
    { name: "소아정", price: 4900 },
    { name: "복소사 세트", price: 4900 },
    { name: "매마른 안주(꾸이칩,마카로니)", price: 3900 },
    { name: "탄산음료", price: 1900 },
    { name: "떼무요아정", price: 500 }
];

// 페이지 로딩 시 스크롤을 맨 위로 이동시키는 함수
window.onload = function() {
    window.scrollTo(0, 0); // 스크롤을 맨 위로 설정
    renderMenuItems(); // 기본 메뉴 렌더링
};

function addMenuItem() {
    const menuName = document.getElementById("menuName").value;
    const menuPrice = parseInt(document.getElementById("menuPrice").value);

    if (menuName && menuPrice > 0) {
        menuItems.push({ name: menuName, price: menuPrice });
        document.getElementById("menuName").value = '';
        document.getElementById("menuPrice").value = '';

        renderMenuItems();
    } else {
        alert("메뉴 이름과 가격을 정확히 입력하세요.");
    }
}

function removeMenuItem(index) {
    menuItems.splice(index, 1);
    renderMenuItems();
}

function renderMenuItems() {
    const menuTableBody = document.getElementById("menuTable").getElementsByTagName('tbody')[0];
    menuTableBody.innerHTML = ''; // 이전 메뉴 목록 지우기

    menuItems.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" id="menuPrice_${index}" value="${item.price}" oninput="calculateTotal()"></td>
            <td class="quantity-control">
                <input type="number" id="menuQty_${index}" value="0" min="0" oninput="calculateTotal()" />
                <button type="button" onclick="changeQuantity(${index}, -1)">-</button>
                <button type="button" onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td><button class="delete-btn" onclick="removeMenuItem(${index})">삭제</button></td>
        `;
        menuTableBody.appendChild(row);
    });
}

function changeQuantity(index, delta) {
    const quantityInput = document.getElementById(`menuQty_${index}`);
    let currentValue = parseInt(quantityInput.value) || 0;
    currentValue += delta;
    if (currentValue < 0) currentValue = 0; // 수량이 음수로 떨어지지 않도록 제한
    quantityInput.value = currentValue;
    calculateTotal();
}

function calculateTotal() {
    let totalAmount = 0;

    menuItems.forEach((item, index) => {
        const quantity = parseInt(document.getElementById(`menuQty_${index}`).value) || 0;
        const price = parseInt(document.getElementById(`menuPrice_${index}`).value) || 0;
        totalAmount += price * quantity;
    });

    document.getElementById("totalAmount").innerText = totalAmount.toLocaleString();
}

// 터치 이벤트 중복 방지
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault(); 
    } 
}, false);

let lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); 
    }
    lastTouchEnd = now; 
}, false);
