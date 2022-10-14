// class Player extends Character {
//   constructor(position) {
//     super(
//       position,
//       { w: 50, h: 100 },
//       "./Sprites/Player/Derecha.png",
//       200,
//       {
//         states: ["Estatico", "Caminar", "Saltar", "Caer", "Agachar"],
//         animations: [
//           {
//             id: "Estatico",
//             transitionTime: 100,
//             loop: false,
//             animaciones: {
//               derecha: [new ImagenDerogada("./Sprites/Player/Derecha.png")],
//               izquierda: [new ImagenDerogada("./Sprites/Player/Izquierda.png")],
//             },
//           },
//           {
//             id: "Caminar",
//             transitionTime: 200,
//             loop: true,
//             animaciones: {
//               derecha: [
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose2.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose3.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose4.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose5.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose6.png"),
//               ],
//               izquierda: [
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose1.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose2.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose3.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose4.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose5.png"),
//                 new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose6.png"),
//               ],
//             },
//           },
//           {
//             id: "Saltar",
//             transitionTime: 0,
//             loop: false,
//             animaciones: {
//               derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose1.png")],
//               izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose1.png")],
//             },
//           },
//           {
//             id: "Caer",
//             transitionTime: 0,
//             loop: false,
//             animaciones: {
//               derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png")],
//               izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png")],
//             },
//           },
//           {
//             id: "Agachar",
//             transitionTime: 30,
//             loop: false,
//             animaciones: {
//               derecha: [
//                 new ImagenDerogada("./Sprites/Player/Agachar/Derecha/Paso1.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Derecha/Paso2.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Derecha/Paso3.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Derecha/Paso4.png"),
//               ],
//               izquierda: [
//                 new ImagenDerogada("./Sprites/Player/Agachar/Izquierda/Paso1.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Izquierda/Paso2.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Izquierda/Paso3.png"),
//                 new ImagenDerogada("./Sprites/Player/Agachar/Izquierda/Paso4.png"),
//               ],
//             },
//           },
//         ],
//       },
//       new ImagenDerogada("./Sprites/Player/Face.png"),
//       {
//         bulletType: Bullet,
//         coolDown: 250,
//       },
//       50,
//       {
//         normal: {
//           x: 0,
//           y: 35,
//         },
//         down: {
//           x: 0,
//           y: 58,
//         },
//       }
//     );
//     this.weapons = new weaponHud();
//     this.updateAmmo();
//   }
//   updateAmmo() {
//     this.ammo = this.weapons.currentAmmo;
//     this.coolDown = this.weapons.currentCooldown;
//   }
//   changeWeapon(type) {
//     this.weapons.changeWeapon(type);
//     if (type == 1) {
//       this.bulletType = Bullet;
//       return;
//     }
//     if (type == 2) {
//       this.bulletType = Laser;
//       return;
//     }
//     if (type == 3) {
//       this.bulletType = Grenade;
//       return;
//     }
//     this.bulletType = Flamethrower;
//   }
//   drawBullets(context) {
//     this.updateAmmoPosition();
//     let posicion = this.positionAmmo.normal;
//     if (this.stateData.duck) {
//       posicion = this.positionAmmo.down;
//     }
//     if (this.orientation == "R") {
//       posicion.x += this.size.w;
//     } else {
//       posicion.x -= this.size.w * 2;
//     }
//     this.bullets.forEach((bullet) => {
//       if (bullet instanceof Flamethrower) {
//         bullet.update(posicion, this.orientation);
//       }
//       bullet.draw(context);
//     });
//   }
//   move(vel, mapaMovement) {
//     if (this.canIMove.l || this.canIMove.r) {
//       super.move(vel);
//       this.orientation = "L";
//       if (vel > 0) {
//         this.orientation = "R";
//       }
//       this.animation.changeOrientation(this.orientation);
//       mapaMovement.mapaCanvas.canvasPosition.x -= vel;
//     }
//   }
//   jump() {
//     super.jump();
//   }
//   draw(context) {
//     this.changeState();
//     super.draw(context);
//     this.HUD.draw(context, {
//       x: this.positionWorld.x - 250,
//       y: this.positionWorld.y - 270,
//     });
//     this.weapons.draw(context, {
//       x: this.positionWorld.x - 250,
//       y: this.positionWorld.y - 270,
//     });
//   }
//   changeState() {
//     //Each one, defines own rules for animations
//     if (this.stateData.jumping == false && !this.physicsData.isGround) {
//       this.animation.changeState("Caer");
//       return;
//     }
//     if (this.stateData.jumping == true && !this.physicsData.isGround) {
//       this.animation.changeState("Saltar");
//       return;
//     }
//     if (this.physicsData.isGround && this.stateData.moving) {
//       this.animation.changeState("Caminar");
//       return;
//     }
//     if (this.physicsData.isGround && this.stateData.duck) {
//       this.animation.changeState("Agachar");
//       return;
//     }
//     this.animation.changeState("Estatico");
//   }
//   shoot() {
//     this.updateAmmo();
//     if (this.ammo > 0) {
//       super.shoot();
//     }
//   }
//   increaseAmmo() {
//     this.weapons.decreaseAmmount();
//   }
//   randomAudio() {
//     let audioNumber = (Math.random() * (3 - 1) + 1).toFixed(0);
//     let damageSound = new Audio();
//     damageSound.src = `./Sprites/Player/Sound/Damage/${audioNumber}.mp3`;
//     return damageSound;
//   }
//   doDamage(damage) {
//     this.randomAudio().play();
//     super.doDamage(damage);
//   }
// }
