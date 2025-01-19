/*
Реализация EventEmitter

Небольшой комментарий #1:
Изначально я подумал, что вывод должен быть просто строкой "Hello, world!",
так как это может быть более привычным для многих пользователей. Однако, после анализа задания,
я пришел к выводу, что такой вывод может быть не самым гибким решением, поскольку задача
подразумевает возможность передачи любых данных (например, объектов).

Выводить целый объект, как я сделал в реализации, гораздо более универсально, так как это
позволяет обрабатывать различные типы данных, передаваемые в событии, и не ограничивает только
строками. Это делает систему более расширяемой и адаптируемой для разных типов событий и данных.

Поэтому, хотя я начал с предположения о выводе строки, я понял, что вывод объекта имеет больше
смысла с точки зрения гибкости.

Небольшой комментарий #2:
Безусловно, мы могли бы вместо fn.apply(this, args) использовать просто fn(...args).
В первом случае this ссылается на EventEmitter, во втором - на глобальный объект.

На мой взгляд, полезно иметь доступ внутри коллбека к EventEmitter, хоть это и не частый кейс,
когда нам внутри коллбека придется делать this.emit или или this.on - именно поэтому я 
остановился на реализации через fn.apply(this, args).
*/

class EventEmitter {
  #events = new Map();

  on(eventName, listener) {
    if (this.#events.has(eventName)) {
      this.#events.get(eventName).add(listener);
    } else {
      this.#events.set(eventName, new Set([listener]));
    }
  }

  off(eventName, listener) {
    if (!listener) {
      this.#events.delete(eventName);
      return;
    }

    const fns = this.#events.get(eventName);
    if (fns) {
      fns.delete(listener);
    }
  }

  emit(eventName, ...args) {
    const fns = this.#events.get(eventName);
    if (!fns) {
      return;
    }

    fns.forEach((fn) => {
      try {
        fn.apply(this, args);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

//Пример использования
const emitter = new EventEmitter();

//Подписка
const logData = (data) => console.log(data);
emitter.on("data", logData);

//Испускание события
emitter.emit("data", { message: "Hello, world!" });

//Удаление конкректного события
emitter.off("data", logData);
