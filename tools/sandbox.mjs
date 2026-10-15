#!/usr/bin/env node
/**
 * tools/sandbox.mjs — CLI de Entornos Aislados (Matt Pocock Sandcastle Pattern)
 * ==============================================================================
 * Comandos:
 *   node tools/sandbox.mjs list                    # Listar sandboxes activos
 *   node tools/sandbox.mjs create <name> [base]    # Crear sandbox aislado
 *   node tools/sandbox.mjs run <name> <cmd...>     # Correr comando en sandbox
 *   node tools/sandbox.mjs verify <name>           # Correr verificación completa
 *   node tools/sandbox.mjs merge <name>            # Verificar y fusionar a HEAD
 *   node tools/sandbox.mjs destroy <name>          # Destruir sandbox y rama
 *   node tools/sandbox.mjs clean-all               # Limpiar todos los sandboxes
 * ==============================================================================
 */

import {
  createSandbox,
  runInSandbox,
  verifySandbox,
  mergeSandbox,
  destroySandbox,
  listSandboxes,
  getSandboxPath
} from "./lib/sandcastle-runner.mjs";

const [cmd, name, ...rest] = process.argv.slice(2);

const B = "\x1b[36m";
const G = "\x1b[32m";
const Y = "\x1b[33m";
const R = "\x1b[31m";
const X = "\x1b[0m";

switch (cmd) {
  case "list": {
    console.log(`\n${B}=== SANDBOXES ACTIVOS (PATRÓN SANDCASTLE) ===${X}`);
    const sandboxes = listSandboxes();
    if (sandboxes.length === 0) {
      console.log(`  ${Y}No hay sandboxes activos actualmente.${X}\n`);
    } else {
      for (const sb of sandboxes) {
        console.log(`  ${G}• ${sb.worktree}${X}`);
        console.log(`    ↳ Rama: ${B}${sb.branch}${X} | Commit: ${sb.head}`);
      }
      console.log(`\nTotal activos: ${sandboxes.length}\n`);
    }
    break;
  }

  case "create": {
    if (!name) {
      console.error(`${R}Error: Debes especificar el nombre del sandbox.${X}`);
      console.log(`Ejemplo: node tools/sandbox.mjs create spike-whisper`);
      process.exit(1);
    }
    const baseRef = rest[0] || "HEAD";
    console.log(`\n${B}Creando sandbox aislado '${name}' basado en ${baseRef}...${X}`);
    try {
      const res = createSandbox(name, baseRef);
      console.log(`✅ Sandbox creado exitosamente.`);
      console.log(`   Ruta:   ${G}${res.path}${X}`);
      console.log(`   Rama:   ${B}${res.branch}${X}`);
      console.log(`\nPuedes ejecutar comandos dentro con:`);
      console.log(`   node tools/sandbox.mjs run ${name} npm test\n`);
    } catch (err) {
      console.error(`${R}Error al crear sandbox:${X} ${err.message}`);
      process.exit(1);
    }
    break;
  }

  case "run": {
    if (!name || rest.length === 0) {
      console.error(`${R}Error: Debes especificar nombre y comando.${X}`);
      console.log(`Ejemplo: node tools/sandbox.mjs run spike-whisper node tools/bench.mjs`);
      process.exit(1);
    }
    const command = rest.join(" ");
    console.log(`\n${B}Ejecutando en sandbox '${name}':${X} ${command}\n`);
    try {
      const res = runInSandbox(name, command);
      process.exit(res.status ?? 0);
    } catch (err) {
      console.error(`${R}Error de ejecución:${X} ${err.message}`);
      process.exit(1);
    }
    break;
  }

  case "verify": {
    if (!name) {
      console.error(`${R}Error: Debes especificar el nombre del sandbox.${X}`);
      process.exit(1);
    }
    try {
      const ok = verifySandbox(name);
      if (ok) {
        console.log(`\n${G}✅ Verificación superada con éxito en '${name}'.${X}\n`);
      } else {
        console.error(`\n${R}❌ La verificación falló en '${name}'.${X}\n`);
        process.exit(1);
      }
    } catch (err) {
      console.error(`${R}Error al verificar sandbox:${X} ${err.message}`);
      process.exit(1);
    }
    break;
  }

  case "merge": {
    if (!name) {
      console.error(`${R}Error: Debes especificar el nombre del sandbox a fusionar.${X}`);
      process.exit(1);
    }
    try {
      mergeSandbox(name);
    } catch (err) {
      console.error(`${R}Error al fusionar sandbox:${X} ${err.message}`);
      process.exit(1);
    }
    break;
  }

  case "destroy": {
    if (!name) {
      console.error(`${R}Error: Debes especificar el nombre del sandbox a destruir.${X}`);
      process.exit(1);
    }
    try {
      destroySandbox(name);
      console.log(`✅ Sandbox '${name}' destruido y limpiado.`);
    } catch (err) {
      console.error(`${R}Error al destruir sandbox:${X} ${err.message}`);
      process.exit(1);
    }
    break;
  }

  case "clean-all": {
    console.log(`\n${Y}Limpiando todos los sandboxes activos...${X}`);
    const sandboxes = listSandboxes();
    for (const sb of sandboxes) {
      const parts = sb.worktree.split(/[/\\]/);
      const sbName = parts[parts.length - 1];
      console.log(`  Destruyendo ${sbName}...`);
      destroySandbox(sbName);
    }
    console.log(`✅ Todos los sandboxes han sido eliminados.\n`);
    break;
  }

  default: {
    console.log(`
Uso de sandbox CLI (Patrón Matt Pocock Sandcastle):
  node tools/sandbox.mjs list                    # Listar sandboxes activos
  node tools/sandbox.mjs create <name> [base]    # Crear sandbox en .sandboxes/<name>
  node tools/sandbox.mjs run <name> <cmd...>     # Ejecutar comando en el sandbox
  node tools/sandbox.mjs verify <name>           # Ejecutar verify en el sandbox
  node tools/sandbox.mjs merge <name>            # Verificar y fusionar a la rama actual
  node tools/sandbox.mjs destroy <name>          # Destruir sandbox y rama
  node tools/sandbox.mjs clean-all               # Destruir todos los sandboxes activos
`);
    break;
  }
}
