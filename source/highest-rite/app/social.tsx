import { ScrollView, Text } from "react-native";
import { Link } from "expo-router";
export default function Screen() { return <ScrollView style={{flex:1, backgroundColor:"#0A0A0A"}} contentContainerStyle={{padding:24,gap:20}}><Text style={{color:"#F5F0E8",fontSize:28}}>Daniel Cruze — Public Links</Text><Link href="https://instagram.com/danielcruzelife" style={{color:"#E0C36C"}}>Instagram</Link><Link href="https://t.me/danielcruzelife_bot" style={{color:"#E0C36C"}}>Telegram bot</Link><Link href="/" style={{color:"#E0C36C"}}>Home</Link></ScrollView>; }
