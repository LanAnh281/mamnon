import Swal from "sweetalert2";
export const success = (title, text) => {
    Swal.fire({
        icon: "success",
        title: title,
        text: text,
        background: "#fff",
        didOpen: () => {
            const popup = Swal.getPopup();
            popup.style.border = "2px solid #ccc";
        },
    });
};