import {React} from 'react';
import { Link } from "react-router-dom";
import s from "./nav.module.css";
import { connect } from 'react-redux';
import { ternaryON, ternaryOFF } from '../../../actions/index.js';


function Nav({ternary, ternaryON, ternaryOFF, callDb, callAll, callAlfa, callRating, callByGenre, search, handleChange, handleSubmit, searchValue}) {








  return(
    <nav className={s.nav}>
        <ul className={s.nav_list}>
          <li>Filtros
            <div className={s.nav_list_sub}>
              <ul className={s.sub_list}>
                <li className={s.sub_list_genres}>Genero
                  <div className={s.nav_list_sub2}>
                    <ul className={s.sub2_list}>
                      <li onClick={() => callByGenre("Action")} >Accion</li>
                      <li onClick={() => callByGenre("Adventure")}>Aventura</li>
                      <li onClick={() => callByGenre("RPG")}>RPG</li>
                      <li onClick={() => callByGenre("Indie")}>Indie</li>
                      <li onClick={() => callByGenre("Strategy")}>Estrategia</li>
                      <li onClick={() => callByGenre("Shooter")}>Shooter</li>
                      <li onClick={() => callByGenre("Casual")}>Casual</li>
                      <li onClick={() => callByGenre("Simulation")}>Simulador</li>
                      <li onClick={() => callByGenre("Puzzle")}>Puzzle</li>
                      <li onClick={() => callByGenre("Arcade")}>Arcade</li>
                      <li onClick={() => callByGenre("Platformer")}>Plataformas</li>
                      <li onClick={() => callByGenre("Racing")}>Carreras</li>
                      <li id="extend" onClick={() => callByGenre("Massively Multiplayer")}>Multijugador</li>
                      <li onClick={() => callByGenre("Sports")}>Deportes</li>
                      <li onClick={() => callByGenre("Fighting")}>Lucha</li>
                      <li onClick={() => callByGenre("Family")}>Familiar</li>
                      <li id="extend" onClick={() => callByGenre("Board Games")}>De Mesa</li>
                      <li onClick={() => callByGenre("Educational")}>Educativos</li>
                      <li onClick={() => callByGenre("Card")}>Cartas</li>
                    </ul>
                  </div>
                </li>
                <li onClick={() => callDb()} className={s.sub_list_created}>Creados</li>
                <li onClick={() => callAll()} className={s.sub_list_Todos}>Todos</li>
              </ul>
            </div>
          </li>
          <li>Ordenar
          <div className={s.nav_list_sub}>
            <ul className={s.sub_list}>
              <li onClick={() => {

                ternary? ternaryOFF() : ternaryON();
                callAlfa(ternary);

                 }
              } className={s.sub_list_alphabetic}>Alfabetico</li>
              <li onClick={() => {

                ternary? ternaryOFF() : ternaryON();
                callRating(ternary);

              }} className={s.sub_list_rating}>Rating</li>
            </ul>
          </div>
          </li>
        </ul>
        <form className={s.nav_form} onSubmit={(e) => handleSubmit(e)}>
          <input  type="search" placeholder="Buscar por nombre"></input>
        </form>
        <Link to="/home/create">
        <button className={s.create_button}>Crear Juego</button>
        </Link>
    </nav>

  )
}

const mapStateToProps = (state) => ({
  ternary: state.ternary,
});

export default connect(mapStateToProps, { ternaryON, ternaryOFF })(Nav)
