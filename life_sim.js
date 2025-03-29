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


yellow = create(200,"yellow")
red = create(200,"red")
green = create(200, "green")

    update=()=>{
    rule(yellow,green, 0.1)
        rule(green,red,-0.01)
        rule(green,green,-0.01)
        rule(red, yellow, -0.03)
    m.clearRect(0,0,500,500)
    draw(0,0,"black",500)
    for(i=0; i<particles.length; i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 4)
        }
    requestAnimationFrame(update)
    }

update()