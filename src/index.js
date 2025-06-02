import { ajax, interval, of } from "rxjs";
import { map, catchError, switchMap, startWith } from "rxjs/operators";


const apiUrl = "/messages/unread"; 

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); 
  return (
    `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`
  );
};

const shortenSubject = (subject) => {
  if (subject.length <= 15) return subject;
  else return subject.slice(0, 15) + "...";
};

const handleErrors = (err) => {
  console.error(err.message);
  return of([]); 
};

const tableBody = document.querySelector("#messages-table tbody");

interval(5000)
  .pipe(
    startWith(-1), 
    switchMap(() => ajax.getJSON(apiUrl)), 
    map((response) => response.messages), 
    catchError(handleErrors) 
  )
  .subscribe((newMessages) => {
    if (Array.isArray(newMessages)) {
      newMessages.forEach((msg) => {
        const row = document.createElement("tr"); 
        row.innerHTML = `
          <td>${msg.from}</td>                 <!-- Отправитель -->
          <td>${shortenSubject(msg.subject)}</td> <!-- Заголовок письма (сокращённый) -->
          <td>${formatTimestamp(msg.received)}</td> <!-- Время получения -->
        `;
        tableBody.insertBefore(row, tableBody.firstChild); 
      });
    }
  });
