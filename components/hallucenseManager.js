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
    var NBR_PARTICULATIONS = 7;
    
    var PARTICULATIONS_MAX_RATE = 300;
    var PARTICULATIONS_MAX_LIFE = 3;
    
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
        var currentDistance = distance;
        if (currentDistance > 2.5) {
            currentDistance = 2.5;
        }
        
        var rate = Math.random() * PARTICULATIONS_MAX_RATE * (1-(currentDistance/2.5));
        var life = Math.random() * PARTICULATIONS_MAX_LIFE;
        var colorStart = hslToRgb(Math.random(), 1, 0.5);
        var color = hslToRgb(Math.random(), 1, 0.5);
        var colorEnd = hslToRgb(Math.random(), 1, 0.5);
        
        
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
                "red": color[0],
                "green": color[1],
                "blue": color[2]
            },
            "alpha": 0.03999999910593033,
            "textures": ROOT + "particulations/" + Math.floor(Math.random() * NBR_PARTICULATIONS) + ".png",
            "maxParticles": rate * life,
            "lifespan": life,
            "emitRate": rate,
            "emitSpeed": 0,
            "speedSpread": 0.10000000149011612,
            "emitOrientation": {
                "x": 0,
                "y": 0,
                "z": 0,
                "w": 1
            },
            "emitDimensions": {
                "x": 3,
                "y": 3,
                "z": 3
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
            "particleRadius": Math.random() * 0.3,
            "radiusSpread": Math.random() * 0.15,
            "radiusStart": Math.random() * 0.3,
            "radiusFinish": Math.random() * 0.3,
            "colorSpread": {
                "red": 15,
                "green": 15,
                "blue": 15
            },
            "colorStart": {
                "red": colorStart[0],
                "green":  colorStart[1],
                "blue":  colorStart[2]
            },
            "colorFinish": {
                "red": colorEnd[0],
                "green": colorEnd[1],
                "blue": colorEnd[2]
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
    
    /*
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    function hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    
})
