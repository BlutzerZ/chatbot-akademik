import 'package:flutter/material.dart';

import 'widgets/chat_bubble.dart';
import 'widgets/dialog_profile.dart';
import 'widgets/drawer_card.dart';

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          'bngky.',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1153A1),
          ),
        ),
        backgroundColor: Colors.white,
        shape: const Border(
          bottom: BorderSide(
            color: Colors.black12,
            width: 1,
          ),
        ),
        actions: [
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.edit_square,
                size: 25,
                color: Color(0xFF1153A1),
              )),
          InkWell(
            onTap: () {
              dialogProfile(context);
            },
            customBorder: const CircleBorder(),
            child: const Padding(
              padding: EdgeInsets.all(12.0),
              child: CircleAvatar(
                backgroundColor: Colors.blueGrey,
                child: Text(
                  'R',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      drawer: const DrawerCard(),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              physics: const AlwaysScrollableScrollPhysics(
                  parent: BouncingScrollPhysics()),
              reverse: true,
              padding: const EdgeInsets.all(10),
              children: const [
                ChatBubble(
                  direction: Direction.right,
                  message: 'Waduh gawat dong',
                  photoUrl: 'https://i.pravatar.cc/150?img=47',
                  type: BubbleType.alone,
                ),
                ChatBubble(
                  direction: Direction.left,
                  message:
                      'Kabarku baik-baik saja, tetapi kabar anggota kita sedikit kacau',
                  photoUrl: 'https://i.pravatar.cc/150?img=47',
                  type: BubbleType.alone,
                ),
                ChatBubble(
                  direction: Direction.right,
                  message: 'Gimana kabar kamu udin',
                  photoUrl: 'https://i.pravatar.cc/150?img=47',
                  type: BubbleType.alone,
                ),
                ChatBubble(
                  direction: Direction.left,
                  message: 'Haloooo Adit',
                  photoUrl: 'https://i.pravatar.cc/150?img=47',
                  type: BubbleType.alone,
                ),
                ChatBubble(
                  direction: Direction.right,
                  message: 'Haloooo',
                  photoUrl: 'https://i.pravatar.cc/150?img=47',
                  type: BubbleType.alone,
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: 10,
              vertical: 12,
            ),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  spreadRadius: 2, // Seberapa jauh bayangan menyebar
                  blurRadius: 4, // Seberapa kabur bayangan
                  offset: const Offset(0, -2), // Arah bayangan (di atas)
                ),
              ],
            ),
            child: Container(
              padding: const EdgeInsets.all(10),
              height: 50,
              width: double.infinity,
              decoration: const BoxDecoration(
                color: Color(0xFFE6EFFF),
                borderRadius: BorderRadius.all(
                  Radius.circular(5),
                ),
              ),
              child: Row(
                children: [
                  const Expanded(
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Kirimkan Pesan...',
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {},
                    child: const Icon(
                      Icons.arrow_circle_up_outlined,
                      size: 35,
                      color: Color(0xFF1153A1),
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
