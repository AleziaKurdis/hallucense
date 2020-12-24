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
    var PARTICLE_HALLUCENSE_URL = [
            ROOT + "PARTICLE_OPERA_SKULL.png",
            ROOT + "PARTICULE_OPERA_018.png",
            ROOT + "PARTICLE_HYPERLIGHTNING_2017.png"
        ];
    
    var SMOKE_EMMITER_OFFSET = {"x": 0.0, "y": 0.2527, "z": 0.0};
    var SMOKE_AMBIENCE_OFFSET = {"x": 0.0, "y": 0.6316, "z": 0.0};
    
    var smokeEmitterID = Uuid.NULL;
    var smokeambienceID = Uuid.NULL;
    var hallucenseID = Uuid.NULL;

    var bottleCenter;
    var bottleRenderWithZones;
    var updateTimerInterval = 15000; // 15 sec 
    var processTimer = 0;
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
        if ((today.getTime() - processTimer) > updateTimerInterval ) {
            update();
            today = new Date();
            processTimer = today.getTime();
        }  
    }

    function shutdown() {
        //Delete all local entities
        Entities.deleteEntity(smokeEmitterID);
        Entities.deleteEntity(smokeambienceID);
        if (hallucenseID !== Uuid.NULL) {
             Entities.deleteEntity(hallucenseID);
        }
    }

    function initiate(EntID) {      
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
        var avatarDistance = Vec3.distance(MyAvatar.position, bottleCenter);
        var hallucenceProperties;
        if (avatarDistance < 2.5) {
            updateTimerInterval = 5000; //5 sec
            if (hallucenseID !== Uuid.NULL) {
                //update mode
                Entities.editEntity(hallucenseID, getHallucenceproperties(avatarDistance));
            } else {
                //create
                hallucenseID = Entities.addEntity(getHallucenceproperties(avatarDistance), "local");
            }
        } else {
            if (hallucenseID !== Uuid.NULL) {
                Entities.deleteEntity(hallucenseID);
                hallucenseID = Uuid.NULL;
            }
            updateTimerInterval = 15000; //15 sec;
        }
    } 

    function getHallucenceproperties(distance) {
        
        var properties = {
            "type": "ParticleEffect",
            "name": "hallucense",
            "position": MyAvatar.position,
            "dimensions": {
                "x": 3.825000047683716,
                "y": 3.825000047683716,
                "z": 3.825000047683716
            },
            "queryAACube": {
                "x": -3.312547206878662,
                "y": -3.312547206878662,
                "z": -3.312547206878662,
                "scale": 6.625094413757324
            },
            "grab": {
                "grabbable": false
            },
            "shapeType": "ellipsoid",
            "color": {
                "red": 0,
                "green": 230,
                "blue": 255
            },
            "alpha": 0.03999999910593033,
            "textures": PARTICLE_HALLUCENSE_URL[Math.floor(Math.random() * PARTICLE_HALLUCENSE_URL.length)],
            "maxParticles": 30,
            "lifespan": 1,
            "emitRate": 10,
            "emitSpeed": 0,
            "speedSpread": 0.10000000149011612,
            "emitOrientation": {
                "x": 0,
                "y": 0,
                "z": 0,
                "w": 1
            },
            "emitDimensions": {
                "x": 2,
                "y": 2,
                "z": 2
            },
            "polarFinish": 3.1415927410125732,
            "emitAcceleration": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "accelerationSpread": {
                "x": 0.5,
                "y": 0.5,
                "z": 0.5
            },
            "particleRadius": 0.25,
            "radiusSpread": 0.20000000298023224,
            "radiusStart": 0.20000000298023224,
            "radiusFinish": 0.30000001192092896,
            "colorSpread": {
                "red": 15,
                "green": 15,
                "blue": 15
            },
            "colorStart": {
                "red": 255,
                "green": 0,
                "blue": 255
            },
            "colorFinish": {
                "red": 0,
                "green": 255,
                "blue": 9
            },
            "renderWithZones": bottleRenderWithZones,
            "alphaSpread": 0.029999999329447746,
            "alphaStart": 0,
            "alphaFinish": 0,
            "emitterShouldTrail": true,
            "particleSpin": 0.1599999964237213,
            "spinSpread": 0.5199999809265137,
            "spinStart": 0,
            "spinFinish": 0
        };
        return properties;
    }
})
