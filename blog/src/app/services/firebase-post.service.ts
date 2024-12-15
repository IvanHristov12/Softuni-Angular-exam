import { Injectable } from '@angular/core';
import { Database, ref, set, get, update, remove, push, DataSnapshot } from '@angular/fire/database';
import { Observable, from, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FirebasePostService {
    constructor(private db: Database) { }

    // Create Post: Automatically generates a unique ID
    createPost(title: string, content: string): Observable<void> {
        const postsRef = ref(this.db, 'Posts'); // Reference to "Posts" node
        const newPostRef = push(postsRef);     // Generates a unique key automatically
        const post = { title, content };       // Post data

        return from(set(newPostRef, post));    // Save the post data to Firebase
    }

    // Get All Posts: Fetches all posts as an array
    getPosts(): Observable<{ id: string; title: string; content: string; author: string }[]> {
        return from(get(ref(this.db, 'Posts'))).pipe(
            map((snapshot: any) => {
                if (snapshot.exists()) {
                    const postsData = snapshot.val();
                    return Object.entries(postsData).map(([id, post]: any) => ({
                        id,
                        ...(post as { title: string; content: string; author: string }),
                    }));
                }
                return [];
            })
        );
    }

    getPostById(postId: string): Observable<{ id: string; title: string; content: string; author: string } | null> {
        const postRef = ref(this.db, `Posts/${postId}`);
        return from(get(postRef)).pipe(
            map((snapshot: any) => {
                if (snapshot.exists()) {
                    return {
                        id: postId,
                        ...(snapshot.val() as { title: string; content: string; author: string }),
                    };
                }
                return null; // Return null if the post doesn't exist
            })
        );
    }

    // Update Post: Updates a specific post by ID
    updatePost(postId: string, title: string, content: string): Observable<void> {
        const postRef = ref(this.db, `Posts/${postId}`);
        const updatedData = { title, content };

        return from(update(postRef, updatedData));
    }

    // Delete Post: Deletes a specific post by ID
    deletePost(postId: string): Observable<void> {
        const postRef = ref(this.db, `Posts/${postId}`);
        return from(remove(postRef));
    }
}
