// import { books } from "./DataBook.js";

export function renderData(book){
    return book.map(item=>{
        return `<div class="card w-50 flex flex-col transition items-center hover:shadow-xl shadow-md bg-gray-50 text-gray-800 p-3 rounded-md" data-aos="zoom-in">
            <div class="image">
                <img src="${item.img}" alt="gambar.jpg" class="rounded-md" style='height:230px'>
            </div>
            <div class="font-bold text-sm card-list" style="height:50px; display:flex; justify-content:center; align-items:center">
                ${item.title}
            </div>
            <button class="btn-toggler w-full hover:bg-black cursor-pointer text-white p-1 bg-blue-600 rounded-sm" data-id="${item.id}">More Info</button>
        </div>`
    })
}
