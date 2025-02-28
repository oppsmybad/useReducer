import { useState, useReducer } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import "./bootstrap.min.css";

// Редьюсер - функция для управления сложными изменениями состояния
// Принимает текущее состояние и действие (action)
// Возвращает новое состояние
function reducer(state, action) {
    switch (action.type) {
        case "toggle":
            // Инвертируем текущее значение autoplay
            return { autoplay: !state.autoplay };
        case "slow":
            // Устанавливаем фиксированное медленное значение
            return { autoplay: 300 };
        case "fast":
            // Устанавливаем фиксированное быстрое значение
            return { autoplay: 700 };
        case "custom":
            // Устанавливаем кастомное значение из action.payload
            return { autoplay: action.payload };
        default:
            throw new Error("Unknown action type");
    }
}

// Функция инициализации состояния
// Позволяет вычислить начальное состояние на основе переданного значения
function init(initial) {
    return { autoplay: initial };
}

const Slider = ({ initial }) => {
    const [slide, setSlide] = useState(0);

    // Использование useReducer для управления сложной логикой состояния
    // 1. reducer - функция-обработчик действий
    // 2. initial - начальное значение (передается из пропсов)
    // 3. init - функция инициализации состояния
    const [autoplay, dispatch] = useReducer(reducer, initial, init);

    function changeSlide(i) {
        setSlide((slide) => slide + i);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img
                    className="d-block w-100"
                    src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                    alt="slide"
                />
                <div className="text-center mt-5">
                    Active slide {slide} <br />
                    {autoplay.autoplay ? "auto" : null}{" "}
                </div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}
                    >
                        -1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}
                    >
                        +1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({ type: "toggle" })}
                    >
                        toggle autoplay
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({ type: "slow" })}
                    >
                        slow autoplay
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({ type: "fast" })}
                    >
                        fast autoplay
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={(e) =>
                            dispatch({
                                type: "custom",
                                payload: +e.target.textContent, // Передача данных через payload
                            })
                        }
                    >
                        1000
                    </button>
                </div>
            </div>
        </Container>
    );
};

function App() {
    return <Slider initial={false} />;
}

export default App;
