export function tmgems({
    distance = 60,
    maxGems = 20,
    gemWidth = 30,
    gemDelay = 500,
    assets = false
}) {


    if (assets && assets.length) {

        let pause;
        let gems = {
            active: false,
            asset: 0,
            gems: [],
            quarry: []
        };

        // BUILD BASE
        let scope = buildui();

        // INTERACTION
        interaction(scope);

        function interaction(p) {

            document.addEventListener('pointerdown', startgems);
            document.addEventListener('pointerup', stopgems);

        }

        function startgems() {

            pause = setTimeout(() => {

                gems.asset = random(0, assets.length);
                gems.active = true;
                document.addEventListener('pointermove', drawgems);

            }, gemDelay)

        }

        function stopgems() {

            clearTimeout(pause);
            gems.active = false;
            document.removeEventListener('pointermove', drawgems);

        }

        function drawgems(e) {

            let comfort = comfortZone(e.clientX, e.clientY, gems.gems, distance);

            if (comfort) {

                let gem = document.createElement('img');
                gem.setAttribute('src', assets[gems.asset]);
                gem.style.left = e.clientX + "px";
                gem.style.top = e.clientY + "px";

                let size = {
                    x: e.clientX,
                    y: e.clientY,
                    el: gem
                }

                gems.gems.push(size);

                scope.parent.appendChild(gem);

                setTimeout(() => {

                    gem.style.width = gemWidth + "px";

                }, 10);

                if (gems.gems.length > maxGems) {

                    gems.gems[0].el.style.width = "0px";
                    gems.quarry.push(gems.gems[0]);
                    gems.gems.splice(0, 1);


                    setTimeout(() => {

                        scope.parent.removeChild(gems.quarry[0].el);
                        gems.quarry.splice(0, 1);

                    }, 800)

                }

            }


        }

    }

}

function comfortZone(x, y, gems, max) {

    let comfort = false;

    if (!gems.length) {

        comfort = true;

    } else {

        if (Math.abs(gems[gems.length - 1].x - x) >= max || Math.abs(gems[gems.length - 1].y - y) >= max) {

            comfort = true;

        }

    }

    return comfort;

}

function random(min, max) {
    max = Math.floor(max) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function resize() {

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    return {
        vw: vw,
        vh: vh
    }

}

function buildui() {

    // ELEMENTS

    let skin = document.createElement('section');
    skin.setAttribute('id', 'tm-gems');

    let vp = resize();

    document.body.appendChild(skin);

    let scope = {
        parent: skin,
        vp: vp
    }

    return scope;

}