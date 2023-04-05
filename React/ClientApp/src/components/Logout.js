export function Logout() {
    sessionStorage.clear();
    sessionStorage.setItem("usertoken", "invalid");
    window.location.replace("https://localhost:44475");
}