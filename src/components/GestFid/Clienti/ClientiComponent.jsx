import react, { Component } from 'react';
import ClientiService from '../Services/API/Clienti/ClientiAPI.js';
import ReactPaginate from 'react-paginate';

export default class ClientiComponent extends Component{
    
    state = {
        clienti: [
            // {codfid: '67301894', nome: 'Nicola La Rocca', indirizzo: 'Via dei Mille, 52', comune: 'Alghero', bollini: '1580', data: '02/01/2020'},
            // {codfid: '67100671', nome: 'Adelina Bianchi', indirizzo: 'P.zza Garibaldi, 3', comune: 'Sassari', bollini: '240', data: '06/01/2020'},
            // {codfid: '67100421', nome: 'Massimo Frigerio', indirizzo: 'Via XX Settembre, 8', comune: 'Fertialia', bollini: '380', data: '09/12/2019'},
            // {codfid: '67100426', nome: 'Giavanna Falchi', indirizzo: 'Via Cavour, 11', comune: 'Alghero', bollini: '2140', data: '15/01/2020'},
        ] ,
        CodFid:"",
        ErrWebApi: false,
        ErrorMsg:"",
        NumCli:0,
        OkMsg:null,

        offset:0,
        data:[],
        elements:[],
        perPage:2,
        currentPage:0
    }

    resetValues = () =>
    {
        this.setState(
            {
                clienti: [],
                ErrWebApi: false,
                ErrorMsg:"",
                NumCli:0
            }
        )    
    }

    componentDidMount()
    {
        // ClientiService.getAllClientiData()
        // .then(response=>this.handleResponse(response))
        // .catch(error => this.handleError(error))
        this.cercaTutti();
    }

    cercaTutti= () => {

        this.resetValues();

        ClientiService.getAllClientiData()
        .then(response=>this.handleResponse(response))
        .catch(error => this.handleError(error))
    }

    cerca = () => {
        console.log("Cerca Codice "+this.state.CodFid);

        // this.setState(
        //     {
        //         clienti: [],
        //         ErrWebApi: false,
        //         ErrorMsg:"",
        //         NumCli:0
        //     }
        // )

        this.resetValues();
        
        if(this.state.CodFid !== "")
        {
            ClientiService.getClienteByCode(this.state.CodFid)
            .then(response=>this.handleResponse(response))
            .catch(error => this.handleError(error))
        }
        else
        {
            this.cercaTutti();
            // ClientiService.getAllClientiData()
            // .then(response=>this.handleResponse(response))
            // .catch(error => this.handleError(error))
        }

       
    }

    Elimina = (codfid) => {
        console.log("Elimina cliente codFid = "+ codfid );

        ClientiService.delClienteByCode(codfid)
        .then( response =>{
            this.setState(
                {
                    OkMsg: `Eliminazione cliente codfid ${codfid} OK`          
                }
            );
            this.cercaTutti();
        })
        .catch(error => this.handleError(error))
    }

    Modifica = (codfid)=> {
        console.log("Modifica cliente codFid = "+ codfid );     
        this.props.history.push(`/inscliente/${codfid}`);
    }

    Inserisci = () =>
    {
        console.log("Inserimento Cliente");     
        this.props.history.push(`/inscliente/-1`);
    }

    handleResponse = (response) =>
    {
        console.log(response);
        
        this.setState(
            {
                clienti: this.state.clienti.concat(response.data)              
            }
        );

        this.setState(
            {               
                NumCli:  this.state.clienti.length,
                data : this.state.clienti,
                pageCount: Math.ceil(this.state.clienti.length / this.state.perPage)
            }
        );

        this.setElementsForCurrentPage();
    }


    setElementsForCurrentPage() {
        let elements = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({ elements: elements });
    }
    handleError = (error) =>
    {
        console.log(error.response.data.message);

        this.setState({
            ErrorMsg:error.response.data.message,
            ErrWebApi:true
        });
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }

    setPerPage = (event) => {
        console.log(event.target.value);

        this.setState(
            { 
                perPage: parseInt(event.target.value), 
                currentPage: 0,  
                offset: 0, 
                data : this.state.clienti,
                pageCount: Math.ceil(this.state.clienti.length / parseInt(event.target.value))}, () => {
            this.setElementsForCurrentPage();
        });
    }
    
    render()
    {
        let paginationElement;

        if (this.state.pageCount > 1) {
            paginationElement = (
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}

                containerClassName={"pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
            );
        }

        return(

            <section className="container">
                
                <div className="table-wrapper"> 
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                            <h2>Risultati Ricerca: <small>Trovati {this.state.NumCli} Clienti</small></h2>
                            </div>
                            <div className="col-sm-7">	
                                <button style={{'marginleft':'20px'}} className="btn btn-success float-right" onClick={this.Inserisci}>
                                    <i className="fa fa-plus"></i> Nuovo Cliente
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="table-filter">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="show-entries">
                                <span>Mostra</span>
                                <select className="form-control" onChange={this.setPerPage}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>5</option>
                                </select>
                                <span>righe</span>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <button type="button" className="btn btn-primary" onClick={this.cerca}><i className="fa fa-search"></i></button>
                                <div className="filter-group">
                                    <label>Filtro: </label>
                                    <input name="CodFid" type="text" className="form-control" onChange={this.GestMod} value={this.state.CodFid} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {this.state.OkMsg && <div className="alert alert-success">{this.state.OkMsg}</div>}
                    <table id="clienti" className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>CodFid</th>
                                <th>Nominativo</th>
                                <th>Indirizzo</th>
                                <th>Comune</th>
                                <th>Telefono</th>
                                <th>Bollini</th>
                                <th>Ultima Spesa</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                            {
                                //this.state.clienti.map (
                                this.state.elements.map (
                                    (cliente , index) => 
                                    <tr key={cliente.codfid}>
                                        <td>{cliente.codfid}</td>
                                        <td>{cliente.nominativo}</td>
                                        <td>{cliente.indirizzo}</td>
                                        <td>{cliente.comune}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.cards.bollini}</td>
                                        <td>{cliente.cards.ultimaspesa}</td>
                                        <td>
                                            <button className="btn btn-warning table-buttons" onClick={()=>this.Modifica(cliente.codfid)}>
                                                <i className="fa fa-edit" aria-hidden="true"></i> Modifica
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning table-buttons" onClick={e=>window.confirm(`Conferma eliminazione cliente codfid ${cliente.codfid} ?`) && this.Elimina(cliente.codfid)}>
                                                <i className="fa fa-minus" aria-hidden="true"></i> Elimina
                                            </button>
                                        </td>
                                    </tr>
                                )
                            } 
                            </tbody>
                    </table>
                    <ErrorWebApiMsg ErrWebApi={this.state.ErrWebApi} ErrorMsg={this.state.ErrorMsg}></ErrorWebApiMsg>
                    {paginationElement}
                </div>
            </section>
        )

    }

    GestMod = (event) => {
        
        this.setState({[event.target.name] : event.target.value});
    }

    

    
}

function ErrorWebApiMsg(props)
{
    if(props.ErrWebApi)
    {
        return <div className="alert alert-danger" role="alert"><h3>{props.ErrorMsg}</h3></div>
    }   
    return null;
}