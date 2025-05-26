const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1;
const maxOrders = 15;

addOrderBtn.addEventListener('click', () => {

    if (orderId > maxOrders) {
        alert(`No se pueden agregar más de ${maxOrders} pedidos`);
        return;
    }
    
    const order = { 
        id: orderId++, 
        status: 'En Proceso' 
    };

    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    
    if (order.status === 'En Proceso') {
        listItem.style.color = 'orange';
    } 
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        order.status = status;
        listItem.textContent = `Pedido #${order.id}: ${status}`;
  
        if (status === 'Completado') {
            listItem.style.color = 'green';
            listItem.style.backgroundColor = '#beffe475';
        }
    }
}

async function processOrder(order) {
    try {
        const preparationTime = Math.floor(Math.random() * 8000) + 3000;
        
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, preparationTime);
        });
        
        updateOrderStatus(order, 'Completado');
        
    } catch (error) {
        console.error(`Error procesando el pedido #${order.id}:`, error);
    }
}