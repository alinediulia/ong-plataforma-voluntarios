/* =========================================================
   PONTO DE ENTRADA DA APLICAÇÃO
   ========================================================= */

import { iniciarRouter } from "./router.js";
import { iniciarToast } from "./components/toast.js";
import { iniciarModal } from "./components/modal.js";
import { iniciarMenu } from "./components/menu.js";
import { iniciarTema } from "./components/tema.js";

iniciarTema();
iniciarToast();
iniciarModal();
iniciarMenu();
iniciarRouter();
