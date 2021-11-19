import React, { useState, useRef } from 'react'
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Carousel from 'react-native-snap-carousel'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default function App() {

    const carouselRef = useRef(null)

    const [lista,setLista] = useState([
        {
            title:"Fringe",
            text: "A agente especial do FBI Olivia Dunham é designada para a Divisão de Ciências Marginais do Birô para investigar crimes e ocorrências fora do normal. Ajudando Olivia em suas investigações está o cientista Walter Bishop, seu filho Peter e a agente Astrid Farnsworth.",
            release: 2008,
            img: 'http://192.168.0.19:19000/assets/img/fringe.jpg'
        },        
        {
            title:"Biohackers",
            text: "Uma estudante de medicina entra na universidade com uma missão secreta: desvendar uma conspiração que liga uma tragédia familiar a uma professora de biologia visionária.",
            release: 2020,
            img: 'http://192.168.0.19:19000/assets/img/biohackers.jpg'
        },          
        {
            title:"Doctor Who",
            text: "A série mostra as aventuras do Doutor, um Senhor do Tempo alienígena do planeta Gallifrey, que explora o universo em sua máquina do tempo, uma sensível nave espacial conhecida como TARDIS.",
            release: 2005,
            img: 'http://192.168.0.19:19000/assets/img/who.jpg'
        },    
        {
            title:"Westworld",
            text: "Westworld é um parque de diversões futurista que permite a seus visitantes viverem suas fantasias utilizando uma consciência artificial. Não importa o quão ilícita a fantasia pode ser, não há consequências para os visitantes do parque.",
            release: 2016,
            img: 'http://192.168.0.19:19000/assets/img/westworld.jpg' 
        },  
        {
            title:"Osmosis",
            text: "Na Paris do futuro, dois irmãos criam um implante de alta tecnologia que promete reunir as almas gêmeas. Mas os testes revelam surpresas desagradáveis.",
            release: 2019,
            img: 'http://192.168.0.19:19000/assets/img/osmosis.jpg'
        },  
        {
            title:"The OA",
            text: "Na série, Brit Marling interpreta uma jovem chamada Prairie Johnson, uma garota cega, que desaparece e retorna sete anos depois com a visão perfeita, Prairie agora se chama OA.",
            release: 2016,
            img: 'http://192.168.0.19:19000/assets/img/oa.jpg'
        },   
        {
            title:"Foundation",
            text: "Foundation é uma série de televisão estadunidense de ficção científica baseada na série de livros de mesmo nome de Isaac Asimov publicadas entre 1933 e 1951.",
            release: 2021,
            img: 'http://192.168.0.19:19000/assets/img/foundation.jpg'
        },                                                              
    ])

    const [background,setBackground] = useState(lista[0].img)
    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity>
                    <Image 
                        source={{uri: item.img}}
                        style={styles.carouselImg}
                    />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <Icon
                        name="play-circle-outline" size={30} 
                        color="#fff" style={styles.carouselIcon} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{flex:1, height:screenHeight}}>
                <View style={{...StyleSheet.absoluteFill, backgroundColor:'000'}}>
                    <ImageBackground
                        source={{ uri: background }}
                        style={styles.imgBg}
                        blurRadius={8}
                    >

                        <View style={styles.viewSearch}>
                            <TextInput
                                style={styles.input}
                                placeholder="Procurando ..."
                            />
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="search" color="#000" size={25} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{color:'#fff', fontSize:30, fontWeight:'bold', marginLeft:10, marginVertical:10}}>
                            Séries de ficção
                        </Text>

                        <View style={styles.slideView}>
                            <Carousel 
                                style={styles.carousel} 
                                ref={carouselRef}
                                data={lista}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={200}
                                inactiveSlideOpacity={0.5}
                                onSnapToItem={ (index) => {
                                    setBackground(lista[index].img);
                                    setActiveIndex(index)
                                }}
                        />
                        </View>

                        <View style={styles.moreInfo}>
                            <View style={{marginTop:10}}>
                                <Text style={styles.movieTitle}>{lista[activeIndex].title}</Text>
                                <Text style={styles.movieDesc}>{lista[activeIndex].text}</Text>
                            </View>  
                            <TouchableOpacity 
                                style={{marginRight:15, marginTop:10}}
                                onPress={() => alert('Assistir')}
                            >
                                <Icon 
                                    name="queue" size={30} color="#131313"                                    
                                />  
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    imgBg: {
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: "flex-start",
        backgroundColor: '#000'
    },
    viewSearch: {
        marginTop: 28,
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    input: {
        width: '95%',
        padding: 14,
        paddingLeft: 20,
        fontSize: 17,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    slideView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
        overflow:'visible',        
    },
    carouselImg: {
        alignSelf: 'center',
        width: 200,
        height: 300,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    carouselText: {
        padding: 15,
        color:'#fff',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold',
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    moreInfo: {
        backgroundColor: '#fff',
        width: screenWidth,
        height: screenHeight,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    movieTitle: {
        paddingLeft: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#131313',
        marginBottom: 5,
    },
    movieDesc: {
        paddingLeft: 15,
        color: '#131313',
        fontSize: 14,
        fontWeight: 'bold',
    }
});