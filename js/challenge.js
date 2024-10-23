document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector("h1#counter");
    let seconds = counter.innerText;
    const myCounter = setInterval(() => {
        counter.innerText = seconds++;
    }, 1000)

    const plus = document.querySelector("button#plus");
    const minus = document.querySelector("button#minus");
    const newArray = [plus, minus];

    newArray.forEach(element => {
        element.addEventListener("click", () => {
            clearInterval(myCounter);
        })
        if (element === plus) {
            element.addEventListener("click", () => {
                const currentTime = counter.innerText;
                counter.innerText = parseInt(currentTime, 10) + 1;
            });
        } else {
            element.addEventListener("click", () => {
                const currentTime = counter.innerText;
                if (parseInt(currentTime, 10) > 0) {
                    counter.innerText = parseInt(currentTime, 10) - 1;
                } else counter.innerText = 0;
            })
        }
    })

    const likeButton = document.querySelector("button#heart");

    let noOfClicks = new Array();

    likeButton.addEventListener("click", () => {
        const currentTime = parseInt(document.querySelector("h1#counter").innerText, 10);
        noOfClicks.push(currentTime);

        let newArray = new Array();
        for (let element of noOfClicks) {
            if (element === currentTime) {
                newArray.push(element);
            }
        }

        const list = document.querySelector("ul.likes");

        if (document.querySelector(`li#A${currentTime}`) === null) {
            const like = document.createElement("li");
            like.setAttribute("id", `A${currentTime}`);
            const span = document.createElement("span");
            span.setAttribute("id", `A${currentTime}`);

            like.innerText = currentTime + " has been liked ";
            span.innerText = newArray.length;

            like.appendChild(span);
            like.append(" times")
            list.appendChild(like);
        } else {
            const s = document.querySelector(`span#A${currentTime}`);
            s.innerText = newArray.length;
        }

        newArray = [];
    })

    const pauseButton = document.querySelector("button#pause");

    let currentClick = new Array();
    pauseButton.addEventListener("click", () => {
        currentClick.push(1);
        console.log(currentClick);
        let answer = currentClick.length;
        console.log(answer);
        if (answer % 2 !== 0) {
            clearInterval(myCounter);
            pauseButton.innerText = "resume";
        } else if (answer % 2 === 0) {
            pauseButton.innerText = "pause";
            resumeInterval(myCounter);
        }
        plus.toggleAttribute("disabled");
        minus.toggleAttribute("disabled");
        likeButton.toggleAttribute("disabled")
    });

    const comment = document.querySelector("form#comment-form").ariaValueMax;
    const form = document.querySelector("form#comment-form");
    const formInput = document.querySelector("input#comment-input");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const answer = formInput.value;

        const listDiv = document.querySelector("div#list");
        const comment = document.createElement("p");
        comment.innerText = answer;

        listDiv.appendChild(comment);

        event.target.reset();
    })
})
