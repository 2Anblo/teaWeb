document.addEventListener('DOMContentLoaded', () => {
    const teaPrices = [
        { type: "寿眉", year: 2023, price: 80 },
        { type: "寿眉", year: 2021, price: 110 },
        { type: "寿眉", year: 2019, price: 175 },
        { type: "寿眉", year: 2017, price: 200 },
        { type: "三级牡丹", year: 2023, price: 110 },
        { type: "三级牡丹", year: 2021, price: 165 },
        { type: "三级牡丹", year: 2019, price: 225 },
        { type: "三级牡丹", year: 2017, price: 275 },
        { type: "二级牡丹", year: 2023, price: 165 },
        { type: "二级牡丹", year: 2021, price: 215 },
        { type: "二级牡丹", year: 2019, price: 279 },
        { type: "二级牡丹", year: 2017, price: 362 },
        { type: "一级牡丹", year: 2023, price: 210 },
        { type: "一级牡丹", year: 2021, price: 295 },
        { type: "一级牡丹", year: 2019, price: 383 },
        { type: "一级牡丹", year: 2017, price: 498 },
        { type: "特级牡丹", year: 2023, price: 500 },
        { type: "特级牡丹", year: 2021, price: 650 },
        { type: "特级牡丹", year: 2019, price: 845 },
        { type: "特级牡丹", year: 2017, price: 1000 },
        { type: "银针", year: 2023, price: 1500 },
        { type: "银针", year: 2021, price: 1900 },
        { type: "银针", year: 2019, price: 2600 },
    ];

    const giftBoxPrices = {
        "125g": 35,
        "150g": 38,
        "30g": 32
    };
    const giftBoxLaborCosts = {
        "125g": 8,
        "150g": 8,
        "30g": 8
    };
    const teaBagPrice = 0.55; // 泡袋价格
    const sealingCost = 1.5; // 塑封费用
    const shippingCost = 25; // 运费
    const taxRate = 0.13; // 税率

    const teaTypeSelect = document.getElementById('teaType');
    const yearSelect = document.getElementById('year');
    const priceInput = document.getElementById('price');
    const resultContent = document.getElementById('resultContent');
    const calculateButton = document.querySelector('button[data-bs-toggle="modal"]');

    const allYears = ["2023", "2021", "2019", "2017"];
    const silverNeedleYears = ["2023", "2021", "2019"];

    function updateYearOptions() {
        const selectedType = teaTypeSelect.value;
        const years = selectedType === "银针" ? silverNeedleYears : allYears;

        yearSelect.innerHTML = '';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    }

    function updatePrice() {
        const selectedType = teaTypeSelect.value;
        const selectedYear = yearSelect.value;
        const selectedTea = teaPrices.find(tea => tea.type === selectedType && tea.year == selectedYear);
        if (selectedTea) {
            priceInput.value = selectedTea.price;
        } else {
            priceInput.value = '';
        }
    }

    function createResultElement(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    function calculateTotal() {
        const selectedType = teaTypeSelect.value;
        const selectedYear = yearSelect.value;
        const price = parseFloat(priceInput.value);
        const weight = parseFloat(document.getElementById('weight').value);
        const giftType = document.getElementById('giftType').value;
        const needInvoice = document.getElementById('needInvoice').checked;

        // 计算总价
        const teaTotalPrice = (weight / 500) * price;

        // 计算礼盒数和泡袋数目
        const giftBoxCount = Math.ceil(weight / parseFloat(giftType));
        const teaBagCount = Math.ceil(weight / 10);

        // 计算报价
        const giftBoxPrice = giftBoxCount * (giftBoxPrices[giftType] + giftBoxLaborCosts[giftType]);
        const teaBagCost = teaBagCount * teaBagPrice;

        // 不算运费
        const totalPriceBeforeTax = giftBoxPrice + teaBagCost + sealingCost + teaTotalPrice ;

        // 清空结果内容
        resultContent.innerHTML = '';

        // 添加计算结果
        resultContent.appendChild(createResultElement(`茶品种类：${selectedType}`));
        resultContent.appendChild(createResultElement(`年份：${selectedYear}`));
        resultContent.appendChild(createResultElement(`单价：${price} 元/斤`));
        resultContent.appendChild(createResultElement(`购买重量：${weight} 克`));
        resultContent.appendChild(createResultElement(`礼盒数：${giftBoxCount}`));
        resultContent.appendChild(createResultElement(`泡袋数目：${teaBagCount}`));
        resultContent.appendChild(createResultElement(`运费：${shippingCost} 元`));
        resultContent.appendChild(createResultElement(`总价：${totalPriceBeforeTax.toFixed(2)} 元`));

        if (needInvoice) {
            const tax = (totalPriceBeforeTax+shippingCost) * taxRate;
            const totalPriceWithTax = totalPriceBeforeTax + tax;
            resultContent.appendChild(createResultElement(`税率：${(taxRate * 100).toFixed(2)}%`));
            resultContent.appendChild(createResultElement(`税额：${tax.toFixed(2)} 元`));
        }
    }

    teaTypeSelect.addEventListener('change', () => {
        updateYearOptions();
        updatePrice();
    });
    yearSelect.addEventListener('change', updatePrice);
    calculateButton.addEventListener('click', calculateTotal);

    updateYearOptions(); // Initialize year options based on the default selection
    updatePrice(); // Initialize the price input based on the default selections
});