import 'package:flutter/material.dart';

class DrawerCard extends StatelessWidget {
  const DrawerCard({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 86,
            width: double.infinity,
            alignment: Alignment.bottomLeft,
            color: const Color(0xFF1153A1),
            padding: const EdgeInsets.all(16),
            child: const Text(
              'Chat History',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          Expanded(
            child: ListView.separated(
              separatorBuilder: (context, index) {
                return const SizedBox(
                  height: 12,
                );
              },
              padding: const EdgeInsets.all(16),
              itemCount: 5,
              itemBuilder: (context, index) {
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(
                      10,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.9),
                        offset: const Offset(5, 3),
                        blurRadius: 6, // Mengatur penyebaran bayangan
                      ),
                    ],
                  ),
                  child: ListTile(
                    title: Text(
                      '${20 - index} Oktober 2024',
                      style: TextStyle(
                        color:
                            index == 1 ? const Color(0xFF1153A1) : Colors.black,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    trailing: const Icon(Icons.arrow_forward_ios),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
