<template>
<div class="container-fluid">
    <div>
        <section id="info">
            <h5 class-="font-bold underline">Join for <span>FREE</span> to</h5>
            <ul>
                <li>Create your own quizzies</li>
                <li>Take any public quiz</li>
                <li>Save your results and compare yourself to other members</li>
                <li>Create public and private Quizzies</li>
                <li>Create Quizzies for fun, educational or professional needs</li>
            </ul>
        </section>
    </div>
</div>
</template>

<style scoped>
    #info {
        color: white;
        font-size: 1rem;
        letter-spacing:4px;
        padding:10px;
        background-color: var(--primary-background-color);
    }

    ul {
        margin-top:20px;
        padding:0;
    }

    #info h5, #info li {
        font-size: clamp(0.8rem, 1rem, 2rem);
        color: white;
        text-align:left;
    }

    ul li {
        list-style-type:circle;
        margin-top:10px;
        margin-left:15px;
        padding-left: 10px;
    }

   
</style>