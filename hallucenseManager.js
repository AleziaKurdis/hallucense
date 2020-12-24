//  hallucenseManager.js
//
//  Created by Alezia Kurdis on December 23, 2020.
//  Copyright 2020 Alezia Kurdis.
//
//  This script manage the particle effect of the Hallucense.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
(function(){ 
    var ROOT = Script.resolvePath("").split("hallucenseManager.js")[0];
    var PARTICLE_SMOKE_EMITTER_URL = ROOT + "burning_smoke.png";
    //var PARTICLE_SPARK_URL = ROOT + "PARTICLE_FIRE_SPARK.png";
    
    var SMOKE_EMMITER_OFFSET = {"x": 0.0, "y": 0.2527, "z": 0.0};
    var SMOKE_AMBIENCE_OFFSET = {"x": 0.0, "y": 0.6316, "z": 0.0};
    
    var smokeEmitterID = Uuid.NULL;
    var smokeambienceID = Uuid.NULL;
    
    var isInitiated = false;
    var bottleCenter;
    var bottleRenderWithZones;
    var DEGREES_TO_RADIANS = Math.PI / 180.0;
    var HALF = 0.5;
    var UPDATE_TIMER_INTERVAL = 5000; // 5 sec 
    var processTimer = 0;
    var hasAlreadyShutdown = false;

    var thisEntity;

    this.preload = function(entityID) {
        thisEntity = entityID;
        initiate(thisEntity);
    };


    this.unload = function(entityID) {
        shutdown();
    };    

    function myTimer(deltaTime) {
        var today = new Date();
        if ((today.getTime() - processTimer) > UPDATE_TIMER_INTERVAL ) {
            update();
            today = new Date();
            processTimer = today.getTime();
        }  
    }

    function shutdown() {
        //Delete all local entities
        Entities.deleteEntity(smokeEmitterID);
        Entities.deleteEntity(smokeambienceID);
    }

    function initiate(EntID) {      
        isInitiated = true;
        var properties = Entities.getEntityProperties(EntID, ["position", "renderWithZones"]);
        bottleCenter = properties.position;
        bottleRenderWithZones = properties.renderWithZones;

        //Generate smoke emitter
        var smokeEmitterProperties = {
            "type": "ParticleEffect",
            "name": "smokeEmitter",
            "position": Vec3.sum(bottleCenter, SMOKE_EMMITER_OFFSET),
            "dimensions": {
                "x": 2.878000259399414,
                "y": 2.878000259399414,
                "z": 2.878000259399414
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": 0,
                "w": 1
            },
            "queryAACube": {
                "x": -2.4807026386260986,
                "y": -2.4924213886260986,
                "z": -2.4924213886260986,
                "scale": 4.984842777252197
            },
            "grab": {
                "grabbable": false
            },
            "renderWithZones": bottleRenderWithZones,
            "shapeType": "ellipsoid",
            "color": {
                "red": 74,
                "green": 72,
                "blue": 68
            },
            "alpha": 0.10000000149011612,
            "textures": PARTICLE_SMOKE_EMITTER_URL,
            "maxParticles": 50,
            "emitRate": 10,
            "emitSpeed": 0,
            "speedSpread": 0,
            "emitOrientation": {
                "x": -0.0000152587890625,
                "y": -0.0000152587890625,
                "z": -0.0000152587890625,
                "w": 1
            },
            "emitDimensions": {
                "x": 0.10000000149011612,
                "y": 0.20000000298023224,
                "z": 0.10000000149011612
            },
            "polarFinish": 3.1415927410125732,
            "emitAcceleration": {
                "x": 0,
                "y": 0.20000000298023224,
                "z": 0
            },
            "particleRadius": 0.25,
            "radiusStart": 0,
            "radiusFinish": null,
            "colorStart": {
                "red": 54,
                "green": 53,
                "blue": 42
            },
            "colorFinish": {
                "red": 194,
                "green": 121,
                "blue": 25
            },
            "alphaStart": 0.20000000298023224,
            "alphaFinish": 0,
            "emitterShouldTrail": true,
            "spinStart": null,
            "spinFinish": null
        };
        smokeEmitterID = Entities.addEntity(smokeEmitterProperties, "local");
        
        //generate smoke ambient 
        var smokeAmbienceProperties = {
            "type": "ParticleEffect",
            "name": "smoke_ambience",
            "position": Vec3.sum(bottleCenter, SMOKE_AMBIENCE_OFFSET),
            "dimensions": {
                "x": 10.055999755859375,
                "y": 10.055999755859375,
                "z": 10.055999755859375
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": 0,
                "w": 1
            },
            "queryAACube": {
                "x": -8.70875072479248,
                "y": -8.70875072479248,
                "z": -8.70875072479248,
                "scale": 17.41750144958496
            },
            "renderWithZones": bottleRenderWithZones,
            "grab": {
                "grabbable": false
            },
            "shapeType": "ellipsoid",
            "color": {
                "red": 102,
                "green": 100,
                "blue": 93
            },
            "alpha": 0.009999999776482582,
            "textures": PARTICLE_SMOKE_EMITTER_URL,
            "maxParticles": 120,
            "lifespan": 12,
            "emitRate": 5,
            "emitSpeed": 0.03999999910593033,
            "speedSpread": 0,
            "emitOrientation": {
                "x": 0.000015259198335115798,
                "y": -0.0000457775968243368,
                "z": 0.7071068286895752,
                "w": 0.7071068286895752
            },
            "emitDimensions": {
                "x": 0.5,
                "y": 2.5,
                "z": 2.5
            },
            "polarFinish": 3.1415927410125732,
            "emitAcceleration": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "particleRadius": 1.5,
            "radiusStart": 1,
            "radiusFinish": 2,
            "colorStart": {
                "red": 156,
                "green": 158,
                "blue": 98
            },
            "colorFinish": {
                "red": 45,
                "green": 56,
                "blue": 64
            },
            "alphaSpread": 0.0020000000949949026,
            "alphaStart": 0.0010000000474974513,
            "alphaFinish": 0,
            "particleSpin": 0.3499999940395355,
            "spinStart": 0,
            "spinFinish": 0.699999988079071
        };
        smokeambienceID = Entities.addEntity(smokeAmbienceProperties, "local");
        
        var today = new Date();
        processTimer = today.getTime();
    
        Script.update.connect(myTimer);
        
    }
    
    function update() {
        // //print("AMBI-UPDATING!");
        // if (isInitiated){
            // var myAvPos = MyAvatar.position;
            // var myAvRot = MyAvatar.orientation;            

            
            // //######### UNIVERSE SOUD VOLUME MANAGEMENT ##############
            // var universeVolume = UNIVERSE_SOUND_VOLUME_MAXIMUM;
            // var astroidFXstatus = true;

            // if (univerSoundPlaying == 1) {
                // if (universeVolume > 0) {
                    // universeSoundInjector.setOptions({"volume": universeVolume});
                // } else {
                    // universeSoundInjector.stop();
                    // univerSoundPlaying = 0;
                // }
            // } else {
                // if (universeVolume > 0) {
                    // universeSoundInjector = Audio.playSound(universeSound, {
                            // "loop": true,
                            // "localOnly": true,
                            // "volume": universeVolume
                            // });
                    // univerSoundPlaying = 1;
                // }   
            // }
            // // ######### END UNIVERSE SOUD VOLUME MANAGEMENT ######## 
            // //############## NOCTURN LIGHTNINGS AND THUNDER #############
            
            // var hytrionCurrentHour = (GetCurrentCycleValue(8640000, DAY_DURATION)/100) / 3600;
            
            // //if ( hytrionCurrentHour > 11.5 || hytrionCurrentHour < 11 ) { //debug
            // if ( hytrionCurrentHour > 21.5 || hytrionCurrentHour < 2.5 ) {  // 21.5 to 2.5
                // if (storming) {
                    // // Manage thunder and color
                    // Entities.editEntity(lightningsID, { "position": Vec3.sum(myAvPos, Vec3.multiply(Quat.getForward(myAvRot), 2 )) });
                    
                    // if (Math.random() < 0.25 && universeVolume != 0) { //0.25 = 1 fois par 20 sec
                        // var thunderVolume = Math.random() * (universeVolume/UNIVERSE_SOUND_VOLUME_MAXIMUM);
                        // var thunderSoundIndex = Math.floor(Math.random() * thunderSound.length);
                        // var thunderPitch = (0.6 + (Math.random() * 1.5));
                        // //print("THUNDER! index (" + thunderSoundIndex + ") volume (" + thunderVolume + ") Pitch ("+ thunderPitch +")");
                        // thunderInjector = Audio.playSound(thunderSound[thunderSoundIndex], {
                            // "loop": false,
                            // "localOnly": true,
                            // "volume": thunderVolume,
                            // "pitch": thunderPitch
                            // });
                        // //print("Injector: " + thunderInjector);
                        // //print("Sound: " + JSON.stringify(thunderSound[thunderSoundIndex]));
                    // }
                // } else {
                    // //initiate the storm
                    // lightningsID = Entities.addEntity({
                        // "type": "ParticleEffect",
                        // "name": "NOCTURN_STORM",
                        // "dimensions": {
                            // "x": 3000,
                            // "y": 3000,
                            // "z": 3000
                        // },
                        // "position": Vec3.sum(myAvPos, Vec3.multiply(Quat.getForward(myAvRot), 2 )),
                        // "grab": {
                            // "grabbable": false
                        // },
                        // "shapeType": "ellipsoid",
                        // "textures": LIGNTNINGS_PARTICLE_URL,
                        // "renderWithZones": bottleRenderWithZones,
                        // "maxParticles": 10,
                        // "lifespan": 0.3,
                        // "emitRate": 0.25,
                        // "emitSpeed": 0,
                        // "speedSpread": 0,
                        // "emitOrientation": {
                            // "x": 0,
                            // "y": 0,
                            // "z": 0,
                            // "w": 1
                        // },
                        // "emitDimensions": {
                            // "x": 3000,
                            // "y": 3000,
                            // "z": 3000
                        // },
                        // "polarStart": 0,
                        // "polarFinish": Math.PI,
                        // "azimuthStart": 0,
                        // "azimuthFinish": Math.PI,
                        // "emitAcceleration": {
                            // "x": 0,
                            // "y": 0,
                            // "z": 0
                        // },
                        // "particleRadius": 900,
                        // "radiusStart": 900,
                        // "radiusFinish": 900,
                        // "radiusSpread": 500,
                        // "color": {
                            // "red": 0,
                            // "green": 128,
                            // "blue": 255
                        // },                        
                        // "colorStart": {
                            // "red": 255,
                            // "green": 255,
                            // "blue": 255
                        // },
                        // "colorFinish": {
                            // "red": 0,
                            // "green": 128,
                            // "blue": 255
                        // },
                        // "colorSpread": {
                            // "red": 0,
                            // "green": 20,
                            // "blue": 20
                        // }, 
                        // "alphaStart": 0.4,
                        // "alpha": 0,
                        // "alphaFinish": 0.4,
                        // "particleSpin": 3.140000104904175,
                        // "spinSpread": 3.140000104904175,
                        // "spinStart": 3.140000104904175,
                        // "spinFinish": 3.140000104904175,                        
                        // "emitterShouldTrail": true                        
                    // }, "local");
                    
                    // storming = true;
                // }
            // } else {
                // if (storming) {
                    // // stop the storm
                    // Entities.deleteEntity(lightningsID);
                    // lightningsID = Uuid.NULL;
                    // storming = false;
                // }
            // }
            
            // //############## END NOCTURN LIGHTNINGS AND THUNDER #############


            // //###################### ASTEROIDS ##############################
            // var astroidEventFrequency = 0.45 + (Math.cos(GetCurrentCycleValue(360, UFO_TIDE_CYCLE_DURATION) * DEGREES_TO_RADIANS) * 0.13);
            
            // if (Math.random() < astroidEventFrequency && astroidFXstatus) {
                // //trigger an astroid
                // GenAsteroid(myAvPos);
            // }
            // //###################### END ASTEROIDS ##########################
        // }
    } 

    // ################## CYLCE AND TIME FUNCTIONS ###########################
    function GetCurrentCycleValue(cyclelength, cycleduration){
		var today = new Date();
		var TodaySec = today.getTime()/1000;
		var CurrentSec = TodaySec%cycleduration;
		
		return (CurrentSec/cycleduration)*cyclelength;
		
	}    
    // ################## END CYLCE AND TIME FUNCTIONS ###########################   

    function positionIsInsideEntityBounds(entityID, targetPosition) {
        targetPosition = targetPosition || MyAvatar.position;

        var properties = Entities.getEntityProperties(entityID, ["position", "dimensions", "rotation"]);
        var entityPosition = properties.position;
        var entityDimensions = properties.dimensions;
        var entityRotation = properties.rotation;

        var worldOffset = Vec3.subtract(targetPosition, entityPosition);
        targetPosition = Vec3.multiplyQbyV(Quat.inverse(entityRotation), worldOffset);

        var minX = -entityDimensions.x * HALF;
        var maxX = entityDimensions.x * HALF;
        var minY = -entityDimensions.y * HALF;
        var maxY = entityDimensions.y * HALF;
        var minZ = -entityDimensions.z * HALF;
        var maxZ = entityDimensions.z * HALF;

        return (targetPosition.x >= minX && targetPosition.x <= maxX
            && targetPosition.y >= minY && targetPosition.y <= maxY
            && targetPosition.z >= minZ && targetPosition.z <= maxZ);
    }
    
    
})