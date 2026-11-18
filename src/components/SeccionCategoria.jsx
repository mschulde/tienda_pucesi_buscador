function seccionCategoria({ titulo, children }) {
    return(
        <section className="bg bg-info">
            <h2 className="badge bg-secondary">{titulo}</h2>
            <div className="row">
                {children}
            </div>
        </section>
    )
}

export default seccionCategoria