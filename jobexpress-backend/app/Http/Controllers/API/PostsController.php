<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Requests\PostImageRequest;
use App\Post;
use App\PostImage;
use Illuminate\Support\Facades\DB;
use Image;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $postRequest, PostImageRequest $imgRequest)
    {
        $postData               =   $postRequest->validated();
        $postData['user_id']    =   1; // Make this dynamic later
        $postData['slug']       =   str_slug($postData['title']);

        try {

            DB::beginTransaction();

            $post = Post::create($postData);

            /** 
             * Check if POST request has any uploaded images. 
             * If so, upload images and save to post_images table 
             */

            if ($imgRequest->hasFile('post_images')) {

                foreach ($imgRequest->post_images as $k => $postImg) {
                    
                    $filename = 'post_' . time() . '_' . $k . '.' . $postImg->getClientOriginalExtension();

                    Image::make($postImg)->save(public_path('img/post_images/').$filename);
                    Image::make($postImg)->resize(300, 300)->save(public_path('img/post_images/thumbs/').$filename);

                    $PostImage              =   new PostImage();
                    $PostImage->post_id     =   $post->id;
                    $PostImage->title       =   $filename;
                    $PostImage->save();
                }
            }

            DB::commit();

            return response()->json([
                'success' => 'Post saved',
                'message' => 'Post saved successfully.'
            ]);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json([
                'errors'  => ['DB' => ['Exception caught! '. $e->getMessage()]],
                'message' => 'Something went wrong.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function mapFields()
    {
        $postFields = [
            'title', 'category_id', 'description', 'start_date', 'end_date', 'state_id', 
            'city_id', 'postcode', 'budget'
        ];

        $postData = [];

        foreach ($postFields as $field) {
            if ($request->has($field)) {
                $postData[$field] = $request->$field;
            }
        }
    }
}
