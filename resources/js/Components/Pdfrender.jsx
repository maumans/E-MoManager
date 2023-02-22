import React, {Fragment, useEffect, useState} from 'react';
import {PDFViewer,PDFDownloadLink, Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

import signature from "/public/images/signature.png"
import formatNumber from "@/Utils/formatNumber";
import {border, borderRight, fontWeight, width} from "@mui/system";
import getMois from "@/Utils/getMois";
import NumberToLetter from "@/Components/NumberToLetter";

//import { NumberToLetter } from 'convertir-nombre-lettre';


// Create styles
const styles = StyleSheet.create({


   pp:{
      fontSize:15,
       paddingVertical:5
   },

    col:{
        flex:1,
        borderBottom:"1px solid black",
        borderRight:"1px solid white",
        textAlign: "center"
   },
    titre:{
        fontSize:15,
        paddingVertical:5,
        fontWeight:'bold',
        textDecoration: "underline",
   }

});



// Create Document Component
function MyDocument(props){
    const [taux,setTaux]=useState()

    useEffect(()=>{
        setTaux(props.infos.location?.devise?.taux)
    },[])


    function montantloyers() {
        let total=0
        props.infos.loyers.map(l=>total+=l?.resteApayer)
        return total
    }
    let auj=new Date().toLocaleDateString();
           return (
               <Document style={styles.page}>
                   <Page size={"A4"} orientation="portrait">
                       <View style={{flex:1,marginLeft:10,flexDirection: 'col',marginTop:5}}>
                           {/*<View>
                               <Image src={logo} style={{width:150,height:"auto"}} alt=""/>
                           </View>*/}
                           <View style={{marginTop:"auto"}}>
                               <Text style={{marginLeft:20,fontWeight:"bold",fontSize:25,color:"purple"}}>{props.infos?.societe?.nom.toUpperCase()}</Text>
                           </View>

                           <View style={{marginTop:"auto"}}>
                               <Text style={{marginLeft:20,fontWeight:"bold",fontSize:25,color:"purple"}}>{props.infos?.societe?.description}</Text>
                           </View>FMonta

                           <View style={{marginTop:"auto"}}>
                               <Text style={{marginLeft:20,fontSize:18}}>{props.infos?.societe?.adresse}</Text>
                           </View>
                       </View>

                       <View style={{flex:0.5,flexDirection: 'row',marginTop:30,marginLeft:30}}>
                           <Text style={{fontSize:18}}>Facture N° {Date.now()}</Text>
                       </View>

                       <View style={{flex:0.5,flexDirection: 'row',marginRight:35,marginLeft:"auto"}}>
                           <View >
                               <Text style={{fontSize:18}}>Date: {auj}</Text>
                           </View>
                       </View>

                       <View style={{flex:0.5,flexDirection: 'row',marginRight:35,marginLeft:"auto",color:'#ad6664'}}>
                           <View >
                               <Text style={{fontSize:23}}>
                                   {props.infos?.location?.locataire?.prenom+" "}
                                   {props.infos?.location?.locataire?.nom+" "}
                               </Text>
                           </View>
                       </View>

                       <View style={{flex:1,flexDirection: 'row',marginRight:45,justifyContent: 'center'}}>
                           <View>
                               <Text style={{fontSize:18}}>
                                   {props.infos?.location?.bien?.description}

                               </Text>
                               <Text style={{fontSize:18, marginVertical:10}}>
                                   {props.infos?.location?.bien?.adresse.toUpperCase()}
                               </Text>

                               <View  style={{flex:1,flexDirection: 'row',justifyContent: 'end'}}>
                                   <Text style={{fontSize:18}}>
                                       {props.infos?.location?.bien?.ville?.nom}
                                   </Text>
                               </View>
                           </View>
                       </View>

                      {/* <View style={{flex:1,flexDirection: 'row',justifyContent: 'between',marginHorizontal:10,marginTop:30}}>

                           <View style={{flex:1,flexDirection: 'column'}}>
                               <Text style={styles.titre}>NUMERO TETE DE PONT: </Text>
                               <Text style={styles.pp}>{props.commande?.auteur?.telephone}</Text>
                               <Text style={styles.titre}>FOURNISSEUR:</Text>
                               <Text style={styles.pp}>{props.commande?.fournisseur?.nom}</Text>
                           </View>

                           <View>
                               <Text style={styles.titre}>DATE: {auj} </Text>
                           </View>
                       </View>*/}

                       <View style={{flex:3,flexGrow:7,flexDirection: 'column',marginHorizontal:10,marginTop:30}}>
                           <View style={{flexDirection: 'row'}}>
                               <View style={[{backgroundColor: "black",border:"solid 1px white"},styles.col]}>
                                   <Text style={[styles.pp,{color:"white"}]}>Details</Text>
                               </View>

                               <View style={[styles.col, {backgroundColor: "black"}]}>
                                   <Text style={[styles.pp,{color:"white"}]}>Période</Text>
                               </View>
                               <View style={[styles.col, {backgroundColor: "black"}]}>
                                   <Text style={[styles.pp,{color:"white"}]}>Montant en GNF</Text>
                               </View>
                           </View>

                           {
                               props.infos?.loyers?.map((l,i)=>(
                                   <View key={l.id} style={{flexDirection: 'row'}}>
                                       <View style={styles.col}>
                                           <Text style={styles.pp}>Tranche {l.tranche}</Text>
                                       </View>
                                       <View style={styles.col}>
                                           <Text style={styles.pp}>{getMois(l?.mois)}</Text>
                                       </View>

                                       <View style={styles.col}>
                                           <Text style={styles.pp}>{formatNumber(l?.resteApayer*taux)}</Text>
                                       </View>
                                   </View>
                               ))
                           }

                           <View style={{flexDirection: 'row'}}>
                               <View style={styles.col}>
                                   <Text style={styles.pp}>Total</Text>
                               </View>
                               <View style={styles.col}>

                               </View>
                               <View style={styles.col}>
                                   <Text style={styles.pp}>{formatNumber(montantloyers()*taux)}</Text>
                               </View>
                           </View>

                           <View style={{marginTop:20}}>
                               <Text>Montant en lettre:</Text>
                               <Text style={{fontSize:15,color:'#4f46e5'}}>{NumberToLetter(montantloyers()*taux)+" franc guinéen"}</Text>

                           </View>

                           <View style={{marginTop:20,marginLeft:'auto'}}>
                               <Text>Total en GNF: {formatNumber(montantloyers()*taux)}</Text>
                           </View>

                           <View style={{flex:1, marginVertical:20}}>

                               <View style={{flex:1,flexDirection:'row',alignItems: 'flex-end',fontSize:15,marginLeft:10}}>
                                   <Text>
                                       Veuillez libérer tous chéques à l'ordre de:
                                   </Text>
                                   <Text style={{marginLeft:'10',fontWeight:"bold"}}>
                                       {props.infos.societe?.nom}
                                   </Text>
                               </View>
                           </View>


                           <View style={{flex:2,flexDirection:"row",width:"100%"}}>
                               <View style={{marginLeft:10}}>
                                   <Text>Loyers {props.infos?.location?.frequence.toLowerCase().split('le')[0]}</Text>
                                   <Text style={{marginTop:10}}>
                                       {formatNumber(montantloyers())+' '+props.infos?.location?.devise?.symbole}
                                   </Text>

                                   <Text style={{marginTop:10}}>
                                       Taux: {taux}
                                   </Text>
                               </View>
                               <View  style={{marginLeft:'auto',marginRight:10}}>
                                   <Text>Le chef de service</Text>
                                   <View>
                                       <Image src={signature} style={{width:100,height:"auto"}} alt=""/>
                                   </View>
                               </View>
                           </View>
                       </View>


                   </Page>
               </Document>
           )
}

function Save({infos}) {

    return (

       <Fragment>
           {
                <PDFViewer style={{ height: "80vh", width: "100%"}}>
                    <MyDocument pageMode="document"  infos={infos}/>
                </PDFViewer>
           }

       </Fragment>
    )

}
export default Save;
