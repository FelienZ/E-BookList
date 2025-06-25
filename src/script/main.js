import { renderData } from "./renderBooks.js";
import { books } from "./DataBook.js";

const card = renderData(books).join('')
const list = document.getElementById('book-list')

list.innerHTML = card

const btnToggler = document.querySelectorAll('.btn-toggler')
const listToggler = document.querySelectorAll('#list-toggler')
const listBook = document.getElementById('bookshelf')
const toggleHamburger = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");
const infoToggler = document.getElementById('info-toggler');
const footer = document.getElementById('footer');
const peminjaman = document.querySelector('.card-peminjaman');
const keyword = document.getElementById('searchBook');
const search = document.getElementById('btnSearchBook');

let data = JSON.parse(localStorage.getItem('peminjaman'))||[]
renderPeminjaman(data)
toggleHamburger.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
  });

btnToggler.forEach(item=>{
  item.addEventListener('click', function(e){
    let id = (e.target.dataset.id)
    const bookInfo = books.find(buku => buku.id == id)
    const cek = generateModal(bookInfo)
    const btnPinjam = document.querySelector('.btn-pinjam')
    btnPinjam.addEventListener('click',function(){
        const data = buatPeminjaman(bookInfo);
        const content = document.getElementById('modal');
        content.classList.remove('flex')
        content.classList.add('hidden')
      })
    })
})

listToggler.forEach(list=>{
  list.addEventListener('click',function(){
      bookselected.scrollIntoView()
  })
})
infoToggler.addEventListener('click',function(){
  footer.scrollIntoView()
})
search.addEventListener('click',function(){
  const keywordSearch = keyword.value;
  const targetSearch = document.querySelectorAll('.card-list');
  let found = false; 
  targetSearch.forEach(item =>{
    let checker = item.textContent.trim().toLowerCase();
    let itemTarget = item.parentElement
    if(keywordSearch.length >= 4){
      if(checker.includes(keywordSearch.toLowerCase()) && keywordSearch !== ''){
      found = true
      itemTarget.scrollIntoView()
      itemTarget.classList.add('ring', 'ring-blue-600', 'ring-offset-2')
      Toastify({
      text: "🔍 Buku Ditemukan!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "green",
      }).showToast();
        setTimeout(() => {
          itemTarget.classList.remove('ring', 'ring-blue-600', 'ring-offset-2')
        }, 3000);
    }
    }
  })
  
  if(!found){
    if(keywordSearch.length < 4) {
      Toastify({
      text: "🔍 Keyword Minimal 4!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "red",
      }).showToast();
    }else{
      Toastify({
      text: "🔍 Buku Tidak Ditemukan!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "red",
    }).showToast();
    }
  }
})

function generateCardPeminjaman(){
  //btn-done -> card
  const btnDone = document.querySelectorAll('.btn-done')
  btnDone.forEach(item=>{
  item.addEventListener('click',function(e){
    const id = e.target.dataset.id
    const bookInfo = books.find(buku => buku.id == id)
    generateModalPeminjaman(bookInfo)
    //btn-selesai -> modal
    const btnHapus = document.querySelector('.btn-selesai')
    btnHapus.addEventListener('click',function(e){
      let idItem = Number(e.target.dataset.id)
      let entry = data.filter(item => item.id !== idItem)
      data = entry
      localStorage.setItem('peminjaman', JSON.stringify(entry))
      renderPeminjaman(entry)
      const content = document.getElementById('modal');
      content.classList.remove('flex')
      content.classList.add('hidden')
    })
  })
})
}

function generateModal(items) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="w-auto">
      <img src="${items.img}" alt="${items.title}" class="w-full h-auto rounded">
    </div>
    <div class="w-auto h-fit md:h-full flex flex-col place-content-center">
      <h2 class="text-xl font-bold mb-5">${items.title}</h2>
      <p class="mb-1"><strong>Author:</strong> ${items.author}</p>
      <p class="text-sm"><strong>Synopsis:</strong> ${items.desc}</p>
      <div class="btn place-self-end w-full mt-5 content-end">
      <button class="btn-pinjam bg-blue-600 w-full px-3 py-1 cursor-pointer hover:bg-blue-900 text-white rounded-md" data-id="${items.id}">Pinjam Buku</button>
      </div>
    </div>`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    return;
}

function generateModalPeminjaman(items) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
  const dates = data.find(book => book.id === items.id)
  content.innerHTML = `
    <div class="w-auto place-self-center">
      <img src="${items.img}" alt="${items.title}" class="w-full h-auto rounded">
    </div>
    <div class="w-auto md:h-full h-fit py-2 flex flex-col text-justify place-content-center">
      <h2 class="text-xl font-bold mb-5">${items.title}</h2>
      <p class="mb-1"><strong>Author:</strong> ${items.author}</p>
      <p class="text-sm"><strong>Synopsis:</strong> ${items.desc}</p>
      <p class="text-sm"><strong>Tanggal Pinjam:</strong> ${dates.date}</p>
      <div class="btn place-self-end w-full mt-5 content-end">
      <button class="btn-selesai bg-red-500 cursor-pointer hover:bg-red-900 w-full px-3 py-1 text-white rounded-md" data-id="${items.id}">Selesaikan Pinjaman</button>
      </div>
    </div>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    return;
}

function buatPeminjaman(items){
  let entry = {id: items.id, title: items.title, img:items.img, date: new Date().toLocaleDateString("id-ID")}
  const status = data.some(book => book.id === entry.id )
  if(!status){
    if(data.length<5){
      data.push(entry)
      localStorage.setItem('peminjaman', JSON.stringify(data))
      renderPeminjaman(data)
      Toastify({
      text: "✅ Berhasil Pinjam!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "green",
      }).showToast();
    }else{
      Toastify({
      text: "❎ Maksimal pinjam 5!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "red",
      }).showToast();
    }
  }else{
    Toastify({
      text: "❎ Buku Sudah Dipinjam",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "red",
      }).showToast();
  }
  return;
}

function renderPeminjaman(entries){
  let card = ''
  entries.forEach(entry=>{
    card += `<div class="cardPinjam shadow-md hover:shadow-xl transition w-50 flex flex-col items-center bg-white text-gray-800 p-3 rounded-sm" data-aos="zoom-in">
      <div class="image">
          <img src="${entry.img}" alt="gambar.jpg" style='height:230px'>
      </div>
      <div class="font-bold text-sm " style="height:50px; display:flex; justify-content:center; align-items:center">
          ${entry.title}
      </div>
      <button class="btn-done w-full hover:bg-black cursor-pointer text-white p-1 bg-blue-600 rounded-sm" data-id="${entry.id}">Tampilkan</button>
  </div>`
  })
  peminjaman.innerHTML = card
  peminjaman.scrollIntoView()
  if(entries.length > 0){
  peminjaman.classList.remove('hidden')
  peminjaman.classList.add('flex')
  generateCardPeminjaman();
  }
}

document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});
