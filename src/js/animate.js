(function () {

    var table = restirct.concat(photos).sort(function (a) {
        return Math.random() > 0.5
    });;

    var camera, scene, renderer;
    var controls;

    var objects = [];
    var targets = { table: [], sphere: [], helix: [], grid: [] };

    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 3000;

        scene = new THREE.Scene();

        for ( var i = 0; i < table.length; i ++ ) {

	        var elementParent = document.createElement( 'div' );
	        elementParent.className = 'elementParent';
	        elementParent.style.width = '310px';
	        elementParent.style.height = '310px';
	        elementParent.style.borderRadius = '50%';

            var element = document.createElement( 'div' );
            element.className = 'element';
            element.style.width = '310px';
            element.style.height = '310px';
            element.style.borderRadius = '50%';
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            element.style.backgroundImage = 'url(./src/photos/' + encodeURI(table[i].path) + ')';
            if(table[i].path === 'Monty Zhang.jpg'){
                element.style.backgroundPositionY = '-50px';
            }


	        elementParent.appendChild( element );


            //
            // var symbol = document.createElement( 'div' );
            // symbol.className = 'symbol';
            // symbol.textContent = table[ i ];
            // element.appendChild( symbol );
            //
            // var details = document.createElement( 'div' );
            // details.className = 'details';
            // details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
            // element.appendChild( details );

            var object = new THREE.CSS3DObject( elementParent );
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            scene.add( object );

            objects.push( object );
            targets.table.push( object );

        }

        // sphere

        var vector = new THREE.Vector3();

        for ( var i = 0, l = objects.length; i < l; i ++ ) {

            var phi = Math.acos( -1 + ( 2 * i ) / l );
            var theta = Math.sqrt( l * Math.PI ) * phi;

            var object = new THREE.Object3D();

            object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
            object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
            object.position.z = 800 * Math.cos( phi );

            vector.copy( object.position ).multiplyScalar( 2 );

            object.lookAt( vector );

            targets.sphere.push( object );

        }

        // helix

        var vector = new THREE.Vector3();

        for ( var i = 0, l = objects.length; i < l; i ++ ) {

            var phi = i * 0.175 + Math.PI;

            var object = new THREE.Object3D();

            object.position.x = 900 * Math.sin( phi );
            object.position.y = - ( i * 8 ) + 450;
            object.position.z = 900 * Math.cos( phi );

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt( vector );

            targets.helix.push( object );

        }

        // grid

        for ( var i = 0; i < objects.length; i ++ ) {

            var object = new THREE.Object3D();

            // object.position.x = ( ( i % 5 ) * 600 ) - 1200;
            // object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 600 ) + 1200;
            // object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 1000;
            if(i === 37) {
	            object.position.x = 0
	            object.position.y = 0
	            object.position.z = 2001
            } else {
	            object.position.x = Math.random() * 4000 - 2000;
	            object.position.y = Math.random() * 4000 - 2000;
	            object.position.z = Math.random() * 4000 - 2500;
            }

            targets.grid.push( object );

        }

        //

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position = 'absolute';
        document.getElementById( 'container' ).appendChild( renderer.domElement );

        //

        controls = new THREE.TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 0.5;
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener( 'change', render );

        window.xzywww = camera;

        var currentZoonIndex = 37;

        transform( targets.sphere, 2000 );

        setTimeout(function () {
            transform( targets.grid, 2000, true);

	        $('.element').removeClass('zoom');
	        $('.elementParent').eq(currentZoonIndex % table.length).find('.element').addClass('zoom');
	        currentZoonIndex++
            setTimeout(changePerson, 4000)
        }, 4000)


        function changePerson(){
            setInterval(function () {
                var end = targets.grid.splice(-1, 1);
	            targets.grid.unshift(end[0]);
	            for ( var i = 0; i < targets.grid.length; i ++ ) {
		            if(i === currentZoonIndex % table.length) {
			            targets.grid[i].position.x = 0
			            targets.grid[i].position.y = 0
			            targets.grid[i].position.z = 2001
		            } else {
			            targets.grid[i].position.x = Math.random() * 4000 - 2000;
			            targets.grid[i].position.y = Math.random() * 4000 - 2000;
			            targets.grid[i].position.z = Math.random() * 4000 - 2500;
		            }
	            }

	            $('.element').removeClass('zoom');
	            $('.elementParent').eq(currentZoonIndex % table.length).find('.element').addClass('zoom');
	            currentZoonIndex++
	            transform( targets.grid, 2000);
            }, 5000)
        }

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function transform( targets, duration , needsZoom) {
        TWEEN.removeAll();

        for ( var i = 0; i < objects.length; i ++ ) {

            var object = objects[ i ];
            var target = targets[ i ];

	        new TWEEN.Tween( object.position )
                .to( { x: target.position.x, y: target.position.y, z: target.position.z }, 1 * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();

            new TWEEN.Tween( object.rotation )
                .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, 1 * duration + duration )
                .easing( TWEEN.Easing.Exponential.InOut )
                .start();
        }

	    if(needsZoom){
		    new TWEEN.Tween( camera)
			    .to( {fov:24}, duration)
			    .start();
        }

        return new TWEEN.Tween( this )
            .to( {}, duration * 2 )
            .onUpdate( render )
            .start()

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    function animate() {

        requestAnimationFrame( animate );

        TWEEN.update();

        controls.update();

    }

    function render() {

        renderer.render( scene, camera );

    }
})()
