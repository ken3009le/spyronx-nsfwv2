const animeContainer = document.getElementById("animeContainer");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");
const clearBtn = document.getElementById("clearBtn");
const menuBtn = document.getElementById("menuBtn");
const body = document.body;

// Các danh mục cần thiết
const categories = new Set(["getWaifuBtn", "getNekoBtn", "getTrapBtn", "getBlowjobBtn"]);

async function fetchAnime(category) {
    try {
        const response = await fetch(`https://api.waifu.pics/nsfw/${category}`);
        const data = await response.json();
        if (!data?.url) return;

        const imgElement = document.createElement("img");
        imgElement.src = data.url;
        imgElement.alt = "Anime Image";
        imgElement.classList.add("animeImage");

        imgElement.onclick = () => {
            modal.style.display = "block";
            modalImg.src = imgElement.src;
        };

        animeContainer.prepend(imgElement);
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

// Xử lý sự kiện click
document.addEventListener("click", (event) => {
    const buttonId = event.target.id;
    if (categories.has(buttonId)) {
        const category = buttonId.replace("get", "").replace("Btn", "").toLowerCase();
        fetchAnime(category);
    }
});

// Xóa ảnh
clearBtn.onclick = () => (animeContainer.innerHTML = "");

// Đóng modal
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// Chuyển chế độ tối
menuBtn.onclick = () => {
    body.classList.toggle("dark-mode");
    menuBtn.innerHTML = "&#x2630;";
};
	