export class Book{
    constructor(title, author, genre, publisher, numberOfPages, readingDate,score, bookImageURL){
        this.title=title;
        this.author=author;
        this.genre=genre;
        this.publisher=publisher;
        this.numberOfPages=numberOfPages;
        this.readingDate=readingDate;
        this.score=score;
        this.bookImageURL=bookImageURL;
    }


    addDataToUI(){
        let tableBody = document.querySelector('#books-tbody');
        if (this.bookImageURL === "") {
            tableBody.innerHTML += `
                <tr>
                    <td><img src="https://placehold.co/400x600?text=NoData" class="img-thumbnail" width="100px" alt="movie poster"></td>
                    <td>${this.title}</td>
                    <td>${this.author}</td>
                    <td>${this.genre}</td>
                    <td>${this.numberOfPages}</td>
                    <td>${this.publisher}</td>
                    <td>${this.readingDate}</td>
                    <td>${this.score}</td>
                    <td><button id="delete-book" class="btn btn-outline-danger">Delete Book</button></td>
                </tr>
            `;
            
        }else{
            tableBody.innerHTML += `
                <tr>
                    <td><img src="${this.bookImageURL}" class="img-thumbnail" width="100px" alt="movie poster"></td>
                    <td>${this.title}</td>
                    <td>${this.author}</td>
                    <td>${this.genre}</td>
                    <td>${this.numberOfPages}</td>
                    <td>${this.publisher}</td>
                    <td>${this.readingDate}</td>
                    <td>${this.score}</td>
                    <td><button id="delete-book" class="btn btn-outline-danger">Delete Book</button></td>
                </tr>
            `;

        }
    };
    

    static loadAllData(){
        let books = this.getDataFromStorage('books')
        let tableBody = document.querySelector('#books-tbody');

        books.forEach(book => {
            if (book.bookImageURL === "") {
                tableBody.innerHTML += `
                    <tr>
                        <td><img src="https://placehold.co/400x600?text=NoData" class="img-thumbnail" width="100px" alt="movie poster"></td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td>${book.numberOfPages}</td>
                        <td>${book.publisher}</td>
                        <td>${book.readingDate}</td>
                        <td>${book.score}</td>
                        <td><button id="delete-book" class="btn btn-outline-danger">Delete Book</button></td>
                    </tr>
                `;
                
            }else{
                tableBody.innerHTML += `
                    <tr>
                        <td><img src="${book.bookImageURL}" class="img-thumbnail" width="100px" alt="movie poster"></td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td>${book.numberOfPages}</td>
                        <td>${book.publisher}</td>
                        <td>${book.readingDate}</td>
                        <td>${book.score}</td>
                        <td><button id="delete-book" class="btn btn-outline-danger">Delete Book</button></td>
                    </tr>
                `;

            }
        });
    }

    static deleteData(parentSelector, buttonSelector, storageKey){
        let tableRows = document.querySelectorAll(`${parentSelector} tr`);
        tableRows.forEach(tableData => {
            tableData.addEventListener('click', (e) => {
                if (e.target.id === buttonSelector) {
                    tableData.remove()
                    this.deleteDataToStorage(storageKey, tableData.children[1]);
                }
            })
        });
    }

    static deleteDataToStorage(storageKey, targetTitle){
        let data = this.getDataFromStorage(storageKey);
        
        data.forEach((el, index) => {
            if (el.title === targetTitle.textContent) {
                data.splice(index, 1)
            }
        });

        localStorage.setItem(storageKey, JSON.stringify(data))
    }

    static deleteAllData(tableSelector, buttonSelector, storageKey){
        let dataTableBody = document.querySelector(tableSelector);
        let deleteAllDataButton = document.querySelector(buttonSelector);

        deleteAllDataButton.addEventListener('click', _ => {
            let allData = dataTableBody.children;
            
            [...allData].forEach(el => {
                el.remove();
                localStorage.removeItem(storageKey)
            });
        });
    }

    static getDataFromStorage(storageKey){
        let data;
        if (localStorage.getItem(storageKey) === null) {
            data = [];
        }else{
            data = JSON.parse(localStorage.getItem(storageKey));
        }

        return data;
    }

    static addDataToStorage(storageKey, data){
        let watchedData = this.getDataFromStorage(storageKey);

        watchedData.push(data);
        localStorage.setItem(storageKey, JSON.stringify(watchedData));
    };

    static clearInputs(inputList){
        inputList.forEach(el => {
            el.value="";
        });
    };
}