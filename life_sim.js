m=document.getElementById("life").getContext('2d')

    draw=(x,y,c,s) => {
    m.fillStyle=c
    m.fillRect(x,y,s,s)
}

particles = []
    particle = (x,y,c) => {
    return {"x": x, "y": y, "vx":0, "vy": 0, "color": c}
    }

    random=()=>{
    return Math.random()*400+50
    }

    create=(number, color)=>{
    group = []
    for(let i = 0; i < number; i++){
        group.push(particle(random(), random(), color))
        particles.push(group[i])
        }
    return group
    }

    rule=(particles1, particles2, g)=>{
    for(let i = 0; i < particles1.length; i++){
        fx = 0
        fy = 0
        for(let j = 0; j < particles2.length; j++){
            a = particles1[i]
            b = particles2[j]
            dx = a.x-b.x
            dy = a.y-b.y
            d = Math.sqrt(dx*dx + dy*dy)
        if(d > 0 && d < 80) {
            F = g * 1 / d
            fx += (F * dx)
            fy += (F * dy)
            }
        }
        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5
        a.x += fx
        a.y += fy
        if(a.x <= 0 || a.x >= 500){a.vx *= -1}
        if(a.y <= 0 || a.y >= 500){a.vy *= -1}

    }
}


let yellow = create(200,"yellow")
let red = create(200,"red")
let green = create(200, "green")

    update=()=>{
        rule(green, yellow, 0.03)
        rule(red, yellow, -0.1)
        rule(green, red, 0.03)
        rule(yellow,green, 0.02)
        rule(red, red, 0.5)
    m.clearRect(0,0,500,500)
    draw(0,0,"black",500)
    for(i=0; i<particles.length; i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 4)
        }
    requestAnimationFrame(update)
    }

update()

const particle_magnitude = document.getElementById("particle_mag");


particle_magnitude.addEventListener("change", function(){
    let p = particles.length
    let g = this.value
    particles = []
    yellow = create(30 * g,"yellow")
    red = create(30 * g,"red")
    green = create(30 * g, "green")
    m.clearRect(0,0,500,500)
    draw(0,0,"black",500)
    document.getElementById("particle_count").innerHTML = p;

})

const selectElement_color_1 = document.getElementById("color_select_1");
const selectElement_action_1 = document.getElementById("action_select_1");
const selectElement_color_2 = document.getElementById("color_select_2");
const selectElement_mag_1 = document.getElementById("magnitude_1");
const selectElement_submit_1 = document.getElementById("submit1");

    let userColors = {}
    selectElement_color_1.addEventListener("change", function() {
        let a = this.value;
        console.log(a);
        userColors["color1"] = a
        // userColors.push(a.toString())
    })
    selectElement_color_2.addEventListener("change", function() {
        let b = this.value;
        console.log(b);
        userColors["color2"] = b
        // userColors.push(b.toString())
    })
    selectElement_mag_1.addEventListener("change", function() {
       let d = this.value;
       userColors["mag"] = d
    console.log(d);
})
    selectElement_action_1.addEventListener("change", function() {
        let c = this.value;
        if(c === "attract"){c = -.1}
        if(c === "repulse"){c = .1 }
        console.log(c);
        userColors["affinity"] = c
    })

selectElement_submit_1.addEventListener("click", function() {
    console.log(userColors)
    userUpdate()
})
    let userUpdate = async () => {
        try {
            rule(eval(userColors["color1"]), eval(userColors["color2"]), eval(userColors["affinity"] * userColors["mag"]))
        } catch (e) {
            console.log(e)
        }
        rule(red, yellow, -0.03)
        rule(yellow, red, .02)
        rule(green, red, 0.03)
        m.clearRect(0, 0, 500, 500)
        draw(0, 0, "black", 500)
        for (i = 0; i < particles.length; i++) {
            draw(particles[i].x, particles[i].y, particles[i].color, 4)
        }
        requestAnimationFrame(userUpdate)
    }


