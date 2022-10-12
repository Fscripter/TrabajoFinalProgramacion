let scriptList = [
  "Models/Utilities/Textures.js",
  "Models/Menu.js",
  "Models/Animaciones.js",
  "Models/Map.js",
  "Models/Cinematica.js",
  "Models/Teclado.js",
  "Models/Utilities/GameObject.js",
  "Models/Animations/Animator.js",
  "Models/Character/character.js",
  "Models/Character/player.js",
  "Models/Character/enemy.js",
  "Models/Utilities/Spawners/EnemySpawner.js",
  "Models/Box/Box.js",
  "Models/Box/TNT.js",
  "Models/Box/boxHealing.js",
  "Models/Box/boxAmmo.js",
  "Models/Box/BoxGrenade.js",
  "Models/Box/BoxFlamethrower.js",
  "Models/Box/BoxLaser.js",
  "Models/Utilities/Spawners/BoxSpawner.js",
  "Models/Cola.js",
  "Models/Fisicas.js",
  "Models/HUD.js",
  "Models/Utilities/Tree.js",
  "Models/Utilities/ColliderEvent/Collider.js",
  "Models/Utilities/UI/Ammo.js",
  "Models/Character/EnemyBoss.js",
  "Models/Engine/Engine.js",
  "Models/Utilities/ColliderEvent/Collision.js",
  "Models/Projectile/projectile.js",
  "Models/Projectile/laser/laser.js",
  "Models/Projectile/bullet/bullet.js",
  "Models/Projectile/grenade/grenade.js",
  "Models/Projectile/flamethrower/flamethrower.js",
  "Models/Hud/weaponsHud.js",
  "main.js",
];

scriptList.forEach((scriptSrc) => {
  let script = document.createElement("script"); //creating <script> element
  script.src = scriptSrc;
  script.async = false;
  document.getElementsByTagName("body")[0].appendChild(script);
});
