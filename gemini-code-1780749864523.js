/**
 * BRAND TALK #10 - CORE APPLICATION JAVASCRIPT
 * Bao gồm: Xử lý hoạt họa Canvas hình học nền và Logic tương tác chuyển đổi Tab Sandboxes
 */

// --- PHẦN 1: ĐỒ HỌA CANVAS MẠNG LƯỚI HÌNH HỌC CHUYỂN ĐỘNG NỀN (GEOMETRIC NETWORK METRIC) ---
const canvas = document.getElementById('bgNetworkCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 45; // Giới hạn số lượng hạt để tối ưu tài nguyên trên GitHub Pages

// Định cấu hình kích thước canvas phủ hợp toàn vùng Hero
function initCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = 850; // Phủ toàn bộ khu vực Header và Hero
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15; // Tốc độ di chuyển chậm tinh tế
        this.speedY = Math.random() * 0.3 - 0.15;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Xử lý nảy khi chạm biên vùng quy hoạch canvas
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.25)'; // Vàng kim nhạt sang trọng
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Kết nối các hạt ở gần nhau tạo cấu trúc liên thông (Biểu trưng cho hệ thống quy trình)
function connectParticles() {
    let maxDistance = 160;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = (1 - (distance / maxDistance)) * 0.12;
                ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateCanvas);
}

// Theo dõi thay đổi kích thước trình duyệt để cấu hình lại hệ thống hạt canvas
window.addEventListener('resize', () => {
    initCanvasSize();
    initParticles();
});


// --- PHẦN 2: CƠ SỞ DỮ LIỆU MÔ HÌNH 5 GIAI ĐOẠN TRƯỞNG THÀNH ---
const stagesData = {
    1: {
        title: "Giai Đoạn 01: FOUNDATION (Nền Tảng)",
        context: "Doanh nghiệp có sản phẩm bán được; tăng trưởng chủ yếu dựa vào cơ hội ngắn hạn và năng lực cá nhân của chủ doanh nghiệp.",
        pain: "Chưa rõ hướng đi chiến lược dài hạn; doanh thu tăng nhưng lợi nhuận mỏng hoặc âm; sản xuất dàn trải, thiếu sản phẩm lõi; lúng túng trong phân bổ nguồn lực eo hẹo.",
        finance: "Xác lập công thức tạo lợi nhuận cơ bản (bóc tách cấu trúc doanh thu, giá vốn, điểm hòa vốn và mô hình định giá sản phẩm). Biến đổi chi phí cố định tối đa sang chi phí linh hoạt, ưu tiên dòng tiền duy trì.",
        tech: "Tập trung các công cụ ghi nhận dữ liệu giao dịch căn bản: Quản lý thông tin khách hàng, doanh thu, dòng tiền ra vào, pipeline bán hàng cơ bản.",
        questions: [
            "Chúng ta đang thực sự kiếm tiền và tạo thặng dư từ phân khúc nào?",
            "Đâu là sản phẩm mũi nhọn đáng dồn lực nhất ở thời điểm hiện tại?",
            "Nếu tiếp tục phân bổ dàn trải thế này, doanh nghiệp có tích lũy được tiền thật không?"
        ]
    },
    2: {
        title: "Giai Đoạn 02: BUILD (Chuẩn Hóa)",
        context: "Sản phẩm cốt lõi đã được định vị rõ trên thị trường; doanh nghiệp bắt đầu thiết lập quy chuẩn và tuyển dụng nhân sự vận hành quy trình.",
        pain: "Bộ máy đứt gãy vận hành nghiêm trọng do thiếu tính liên thông; bùng phát sai sót và lỗi hỏng tại hiện trường sản xuất; người chủ ngập chìm vào việc dập lửa sự vụ.",
        finance: "Tối ưu hóa hiệu suất chi phí thông qua thiết lập định mức vận hành chi tiết; xây dựng ngân sách dựa trên hoạt động (activity-based budgeting); đo lường hiệu quả chi tiết theo kênh, nhóm sản phẩm và khách hàng.",
        tech: "Triển khai hệ thống Quản lý quy trình và dữ liệu tập trung (CRM/vận hành lõi) để chuẩn hóa và liên kết dữ liệu dòng thông tin từ Bán hàng đến Chuyển giao dịch vụ.",
        questions: [
            "Vì sao số lượng đơn hàng đông hơn nhưng bộ máy vận hành lại rối và phát sinh lỗi nhiều hơn?",
            "Khâu hành động nào tại hiện trường đang làm thất thoát tiền ngầm nhiều nhất?",
            "Nếu tiếp tục nhân rộng quy mô, bộ máy sẽ phình to lên hay vỡ vận hành trước?"
        ]
            },
    3: {
        title: "Giai Đoạn 03: GROWTH (Động Cơ Tăng Trưởng)",
        context: "Doanh nghiệp sở hữu nhiều đơn vị kinh doanh (BUs), sản phẩm hoặc kênh bán hàng tăng trưởng mạnh mẽ và song hành.",
        pain: "Ban giám đốc rơi vào trạng thái 'mù mịt quyết định'; không rõ mảng nào thực sự mang lại lợi nhuận gộp ròng cao nhất; nguồn lực bị phân mảnh do yếu tố tình cảm.",
        finance: "Dẫn vốn thông minh vào động cơ tăng trưởng thực tế; chuẩn hóa cấu trúc P&L đến từng đơn vị kinh doanh BU riêng biệt; đo lường sức mạnh đòn bẩy kinh doanh và lãi đóng góp.",
        tech: "Hợp nhất và tích hợp dữ liệu đa nguồn (Marketing, Sales, Finance, Operations) thành các Dashboard realtime hỗ trợ ra 4 quyết định: Thúc, Sản lượng, Điểm nghẽn, Cơ cấu.",
        questions: [
            "Doanh nghiệp đang thực sự phát triển hiệu quả, hay chỉ phình to về chi phí nhân sự và vận hành?",
            "Đâu là đơn vị kinh doanh mũi nhọn thực chất cần tập trung rót vốn ưu tiên?",
            "Tại sao hệ thống có rất nhiều dữ liệu thô nhưng ban lãnh đạo vẫn thiếu cơ sở chắc chắn để đưa ra quyết định xuống tiền?"
        ]
    },
    4: {
        title: "Giai Đoạn 04: SCALE (Tối Ưu Mô Hình)",
        context: "Quy mô doanh nghiệp tăng tốc nhanh; độ phức tạp và tính phân mảnh giữa các đơn vị kinh doanh đạt ngưỡng cực đại.",
        pain: "Mất kiểm soát hệ thống; sự tăng trưởng phụ thuộc quá nhiều vào năng lực cá nhân của các quản lý chủ chốt; chi phí phối hợp nội bộ phình to lấn át lợi nhuận.",
        finance: "Quản trị các đơn vị kinh doanh như một danh mục đầu tư chuyên nghiệp; kiểm soát tài chính và dòng tiền qua hệ thống 3 tầng; thiết lập kỷ luật phân bổ và điều chuyển ngân sách nghiêm ngặt.",
        tech: "Triển khai hệ thống Điều hành hợp nhất; xây dựng nguồn số liệu thống nhất - hạch toán đa chiều; Dashboard phân tầng (CEO, HO, BU) hỗ trợ kiểm soát thực thi rủi ro.",
        questions: [
            "Chúng ta có tiêu chí rõ ràng nào bằng số liệu để rót thêm vốn, giữ nguyên hay đóng cửa một đơn vị kinh doanh?",
            "Lợi nhuận của doanh nghiệp đến từ năng lực hệ thống tự vận hành hay do năng lực của một vài cá nhân chủ chốt?",
            "Dòng tiền thặng dư đang được tái đầu tư để tăng trưởng năng lực cốt lõi, hay đang tiêu đi để bù đắp các lỗ hổng vận hành?"
        ]
    },
    5: {
        title: "Giai Đoạn 05: GLOBALIZE (Mở Rộng Đa Quốc Gia)",
        context: "Doanh nghiệp vươn tầm ra thị trường quốc tế hoặc nhân bản mô hình kinh doanh sang một hệ sinh thái đa pháp nhân, đa bối cảnh.",
        pain: "Rủi ro chính trị, pháp lý, thuế và tỷ giá tăng mạnh; mâu thuẫn sâu sắc giữa việc chuẩn hóa quy trình toàn cục và tính thích ứng địa phương hóa; tốc độ mở rộng vượt xa năng lực giám sát rủi ro của HO.",
        finance: "Quản trị rủi ro danh mục đầu tư đa quốc gia; kiểm soát chặt chẽ cấu trúc vốn và luân chuyển dòng tiền xuyên biên giới; đánh giá dựa trên giá trị dài hạn toàn cục (Enterprise Value).",
        tech: "Đồng bộ hóa hạ tầng quản lý quy mô lớn xuyên biên giới; xây dựng hệ thống báo cáo và cảnh báo rủi ro tự động realtime toàn cầu.",
        questions: [
            "Năng lực lõi đã giúp doanh nghiệp chiến thắng ở thị trường nội địa có thực sự phù hợp với bối cảnh pháp lý và văn hóa mới?",
            "Chúng ta đã thiết lập được ban kiểm soát và quản trị rủi ro đủ mạnh để vận hành hệ sinh thái đa quốc gia?",
            "Làm sao mở rộng quy mô toàn cầu mà không đánh đổi tính bền vững tài chính và bản sắc cốt lõi của doanh nghiệp?"
        ]
    }
};

function switchStage(stageNum) {
    document.querySelectorAll('.stage-tab').forEach((btn, idx) => {
        if (idx + 1 === stageNum) {
            btn.className = "stage-tab py-2.5 sm:py-3 px-1 rounded-lg text-xs font-bold transition-all text-center focus:outline-none bg-amber-500/10 text-amber-800 border border-amber-500/25";
        } else {
            btn.className = "stage-tab py-2.5 sm:py-3 px-1 rounded-lg text-xs font-bold transition-all text-center focus:outline-none text-slate-600 hover:text-slate-900";
        }
    });

    const data = stagesData[stageNum];
    let questionsHtml = '';
    data.questions.forEach(q => {
        questionsHtml += `
            <li class="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                <span class="text-amber-600 font-bold shrink-0">?</span>
                <span>${q}</span>
            </li>
        `;
    });

    document.getElementById('stage-content-box').innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div class="lg:col-span-7 space-y-6">
                <div>
                    <h3 class="text-lg sm:text-xl font-extrabold text-slate-800">${data.title}</h3>
                    <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed"><strong>Bối cảnh thực tế:</strong> ${data.context}</p>
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                        <span class="block text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">Chẩn đoán Nỗi đau & Triệu chứng</span>
                        <p class="text-xs text-slate-600 leading-relaxed">${data.pain}</p>
                    </div>
                    <div class="p-4 bg-amber-5 border border-amber-200/40 rounded-2xl">
                        <span class="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-1">Giải pháp Quản trị Tài chính</span>
                        <p class="text-xs text-slate-600 leading-relaxed">${data.finance}</p>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-5 space-y-6">
                <div class="p-4 bg-stone-100/80 border border-amber-200/20 rounded-2xl">
                    <span class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Giải pháp Công nghệ & Dữ liệu</span>
                    <p class="text-xs text-slate-600 leading-relaxed">${data.tech}</p>
                </div>
                <div class="p-5 bg-white border border-amber-200/50 rounded-2xl shadow-sm">
                    <span class="block text-xs font-bold text-amber-800 uppercase tracking-wide mb-3">3 Câu hỏi Sát sườn cho CEO</span>
                    <ul class="space-y-2.5">${questionsHtml}</ul>
                </div>
            </div>
        </div>
    `;
}


// --- PHẦN 3: LOGIC TƯƠNG TÁC TABS PHÂN TÍCH CASE STUDY ---
function switchCaseTab(tabNum) {
    document.querySelectorAll('.case-tab').forEach((btn, idx) => {
        if (idx + 1 === tabNum) {
            btn.className = "case-tab px-4 py-2 text-xs font-bold rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-800 transition-all";
        } else {
            btn.className = "case-tab px-4 py-2 text-xs font-bold rounded-lg border border-transparent text-slate-500 hover:text-amber-800 transition-all";
        }
    });

    document.querySelectorAll('.case-panel').forEach(panel => panel.className = "case-panel hidden");
    document.getElementById(`case-panel-${tabNum}`).className = "case-panel block animate-fadeIn";
}


// --- PHẦN 4: KHỐI GIẢ LẬP SỐ LIỆU TÀI CHÍNH TỰ ĐỘNG (SANDBOX CALCULATORS) ---
function runAISimulator() {
    const currentStaff = parseInt(document.getElementById('sim-staff').value) || 0;
    const avgSalary = parseInt(document.getElementById('sim-salary').value) || 0;

    const staffSaved = Math.round(currentStaff * 0.5);
    const annualSalarySaved = staffSaved * avgSalary * 12;
    const annualAICost = Math.round((currentStaff * 0.1) * 4000000) * 12;
    const netSavings = annualSalarySaved - annualAICost;

    document.getElementById('sim-staff-saved').innerText = `${staffSaved} nhân sự`;
    document.getElementById('sim-money-saved').innerText = formatVND(annualSalarySaved);
    document.getElementById('sim-ai-cost').innerText = formatVND(annualAICost);
    document.getElementById('sim-net-profit').innerText = (netSavings >= 0 ? '+' : '') + formatVND(netSavings);
}

function runPricingCalculator() {
    const basePrice = parseInt(document.getElementById('base-price').value) || 0;

    document.getElementById('price-t5').innerText = basePrice.toLocaleString('vi-VN') + 'đ';
    document.getElementById('price-t4').innerText = Math.round(basePrice * 0.85).toLocaleString('vi-VN') + 'đ';
    document.getElementById('price-t3').innerText = Math.round(basePrice * 0.70).toLocaleString('vi-VN') + 'đ';
    document.getElementById('price-t2').innerText = Math.round(basePrice * 0.60).toLocaleString('vi-VN') + 'đ';
    document.getElementById('price-t1').innerText = Math.round(basePrice * 0.50).toLocaleString('vi-VN') + 'đ';
}

function formatVND(amount) {
    if (Math.abs(amount) >= 1000000000) return (amount / 1000000000).toFixed(1) + ' tỷđ';
    if (Math.abs(amount) >= 1000000) return (amount / 1000000).toFixed(0) + ' triệuđ';
    return amount.toLocaleString('vi-VN') + 'đ';
}

function updateJTBDProgress() {
    const items = document.querySelectorAll('.jtbd-item');
    let checkedCount = 0;
    items.forEach(item => { if (item.checked) checkedCount++; });

    const percentage = Math.round((checkedCount / items.length) * 100);
    document.getElementById('jtbd-percent').innerText = `${percentage}%`;
    document.getElementById('jtbd-progress-bar').style.width = `${percentage}%`;
}


// --- PHẦN 5: KHỞI CHẠY KHỐI ỨNG DỤNG KHI TRANG SẴN SÀNG ---
document.addEventListener('DOMContentLoaded', () => {
    initCanvasSize();
    initParticles();
    animateCanvas();
    
    // Khởi tạo các trạng thái hiển thị ngầm định ban đầu
    switchStage(1);
    runAISimulator();
    runPricingCalculator();
    updateJTBDProgress();
});