
Запуск проекта 
npm run dev:all 

Ответы на вопросы: 

1. event propagation - это распространения события по DOM дереву.  
содержит 3 фазы: 
Фаза захвата 
Фаза цели
Фаза всплытия 
Способы применения знаний о фазах распространений событий на практике.  
stopPropagation() - останавливает распространение
stopImmediatePropagation() - останавливает все обработчики

2. Promise - объект, который представляет результат асинхронной операции. 
Состояния promise: 
pending, fulfilled, rejected 
Альтернативный вариант обработки асинхронного кода - async/await  

Event Loop (Событийный цикл) - это механзим , который позволяет js обрабатывать асинхронные операции в однопоточном окружении.  

3. ООП - объектно ориентированное программирование 
3 главных принципа в ооп 
инкапсуляция (сокрытие внутренней реализации) 
наследование (создание новых классов на основе существующих) 
полиморфизм (способность объектов использовать методы с одинаковым именем по разному)


Реализация ES6+
class Animal {
    #privateField = 'secret';
    
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        throw new Error('Method must be implemented');
    }
    
    getPrivate() {
        return this.#privateField;
    }
}

class Dog extends Animal { // Наследование
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} barks!`;
    }
}

class Cat extends Animal {
    speak() {
        return `${this.name} meows!`;
    }
}

const animals = [new Dog('Rex', 'Labrador'), new Cat('Whiskers')];
animals.forEach(animal => console.log(animal.speak()));


4.  Фаза 1: Ввод URL и парсинг
Ввод URL в адресную строку
Проверка кэша браузера (HTTP Cache, Service Workers)
DNS Lookup - преобразование домена в IP-адрес:
Кэш DNS браузера → кэш ОС → DNS сервер провайдера → Root DNS
Установка TCP-соединения (3-way handshake: SYN, SYN-ACK, ACK)
Фаза 2: Запрос и получение данных
TLS Handshake (для HTTPS):
Client Hello → Server Hello → Certificate Verification → Key Exchange
HTTP-запрос к серверу
Обработка на сервере:
Веб-сервер (Nginx/Apache) → Бэкенд (Node.js/PHP) → База данных
HTTP-ответ с заголовками и телом
Фаза 3: Обработка контента
Парсинг HTML → построение DOM-дерева
Парсинг CSS → построение CSSOM-дерева
Создание Render Tree (комбинация DOM + CSSOM)
Layout (Reflow) - расчет позиций и размеров элементов
Paint - отрисовка пикселей
Composite - объединение слоев для отображения
Фаза 4: Исполнение JavaScript
Загрузка и парсинг JS (при встрече <script>)
Компиляция (JIT в V8) 
Исполнение - взаимодействие с DOM/CSSOM 

Технологии для ускорения 
HTTP/2, HTTP/3 
Preconnect, Prefetch, Preload  
Lazy Loading 
Virtual DOM 
Code Splitting  

Проблемы безопасности 
CORS, JSONP 

Самые главные угрозы
XSS, CSRF, Clickjacking  
