import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./nav.css";
import { connect } from 'react-redux';
import { ternaryON, ternaryOFF } from '../../../actions/index.js';


function Nav({ternary, ternaryON, ternaryOFF, callDb, callAll, callAlfa, callRating, callByGenre, search, handleChange, handleSubmit, searchValue}) {








  return(
    <nav className="nav">
        <ul className="nav_list">
          <li>Filtros
            <div className="nav_list-sub">
              <ul className="sub_list">
                <li className="sub_list-genres">Genero
                  <div className="nav_list-sub2">
                    <ul className="sub2_list">
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
                      <li id="extend" onClick={() => callByGenre("Massively Multiplayer")}>Multijugador Masivo</li>
                      <li onClick={() => callByGenre("Sports")}>Deportes</li>
                      <li onClick={() => callByGenre("Fighting")}>Lucha</li>
                      <li onClick={() => callByGenre("Family")}>Familiar</li>
                      <li id="extend" onClick={() => callByGenre("Board Games")}>Juegos de Mesa</li>
                      <li onClick={() => callByGenre("Educational")}>Educativos</li>
                      <li onClick={() => callByGenre("Card")}>Cartas</li>
                    </ul>
                  </div>
                </li>
                <li onClick={() => callDb()} className="sub_list-created">Creados</li>
                <li onClick={() => callAll()} className="sub_list-Todos">Todos</li>
              </ul>
            </div>
          </li>
          <li>Ordenar
          <div className="nav_list-sub">
            <ul className="sub_list">
              <li onClick={() => {

                ternary? ternaryOFF() : ternaryON();
                callAlfa(ternary);

                 }
              } className="sub_list-alphabetic">Alfabetico</li>
              <li onClick={() => {

                ternary? ternaryOFF() : ternaryON();
                callRating(ternary);

              }} className="sub_list-rating">Rating</li>
            </ul>
          </div>
          </li>
        </ul>
        <form className="nav_form" onSubmit={(e) => handleSubmit(e)}>
          <input  type="search" placeholder="Buscar por nombre"></input>
        </form>
        <Link to="/home/create">
        <button className="create_button">Crear Juego</button>
        </Link>
    </nav>

  )
}

const mapStateToProps = (state) => ({
  ternary: state.ternary,
});

export default connect(mapStateToProps, { ternaryON, ternaryOFF })(Nav)
